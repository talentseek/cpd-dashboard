import { supabase } from "@/lib/utils";
import { 
    DatabaseLead, 
    ScrapedLead, 
    ScrapingApiResponse, 
    LinkedInCookies,
    ScrapeResult 
} from "@/types/scraping";
import { v4 as uuidv4 } from "uuid";

export async function scrapeLinkedInProfiles(
    searchUrl: string,
    cookies: LinkedInCookies
): Promise<ScrapedLead[]> {
    const response = await fetch("http://localhost:4000/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cookies,
            searchUrl,
            checkOpenProfiles: true,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch scraping data: ${response.statusText}`);
    }

    const { success, data } = (await response.json()) as ScrapingApiResponse;

    if (!success || !data) {
        throw new Error("Scraping API returned an error or empty data.");
    }

    return data;
}

export async function handleScrapeLinkedInProfilesTask({
    campaignId,
    searchUrl,
}: {
    campaignId: number;
    searchUrl: string;
}): Promise<ScrapeResult> {
    console.log(`Starting scraping for campaignId ${campaignId}, searchUrl: ${searchUrl}`);

    try {
        // Fetch cookies from the database
        const { data: campaignData, error: fetchError } = await supabase
            .from("campaigns")
            .select("cookies")
            .eq("id", campaignId)
            .single();

        if (fetchError || !campaignData?.cookies) {
            throw new Error(`Failed to fetch cookies for campaignId ${campaignId}`);
        }

        const { cookies } = campaignData;

        console.log(`Fetched cookies for campaignId ${campaignId}:`, cookies);

        // Call your scraping API
        const response = await fetch("http://localhost:4000/api/scrape", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cookies, // Pass cookies
                searchUrl,
                checkOpenProfiles: true,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch scraping data: ${response.statusText}`);
        }

        const { success, data } = (await response.json()) as ScrapingApiResponse;

        if (!success || !data) {
            throw new Error("Scraping API returned an error or empty data.");
        }

        console.log(`Scraping API returned ${data.length} results.`);

        // Save leads to the database
        const processedLeads: DatabaseLead[] = data.map((lead: ScrapedLead) => ({
            id: uuidv4(),
            created_at: new Date().toISOString(),
            company: lead.company,
            first_name: lead.fullName.split(" ")[0],
            last_name: lead.fullName.split(" ")[1] || "",
            linkedin: lead.profileLink,
            website: lead.companyLink,
            position: lead.jobTitle,
            client_id: campaignId,
            message_sent: false,
            search_url_id: campaignId,
            is_duplicate: false,
            is_open_profile: lead.isOpen,
            is_premium_profile: lead.isPremium,
            connection_level: lead.connectionLevel,
        }));

        const { error: insertError } = await supabase.from("leads").insert(processedLeads);

        if (insertError) {
            throw new Error(`Error inserting leads into Supabase: ${insertError.message}`);
        }

        console.log(`Successfully saved ${processedLeads.length} leads to the database.`);

        // Update search_url table with counts
        const openProfilesCount = data.filter((lead: ScrapedLead) => lead.isOpen).length;
        const totalProfilesCount = data.length;

        await supabase
            .from("search_urls")
            .update({
                status: "completed",
                open_profiles_count: openProfilesCount,
                total_profiles_count: totalProfilesCount,
            })
            .eq("url", searchUrl);

        return { 
            success: true, 
            message: "Scraping completed successfully!",
            profiles: data 
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error in handleScrapeLinkedInProfilesTask: ${error.message}`);
        } else {
            console.error(`Error in handleScrapeLinkedInProfilesTask: ${String(error)}`);
        }
        throw error;
    }
}