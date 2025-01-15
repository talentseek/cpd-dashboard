import puppeteer from "puppeteer";
import { LinkedInProfile } from "@/types/linkedin";

export async function scrapePremiumProfiles(
    salesNavigatorUrl: string,
    cookies: { li_a: string; li_at: string }
): Promise<LinkedInProfile[]> {
  const browser = await puppeteer.launch({
    headless: false, // For debugging, set to true for production
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    console.log("Setting cookies for debugging:", cookies);

    // Set LinkedIn cookies
    await page.setCookie(
      { name: "li_a", value: cookies.li_a, domain: ".linkedin.com" },
      { name: "li_at", value: cookies.li_at, domain: ".linkedin.com" }
    );

    console.log("Navigating to Sales Navigator URL:", salesNavigatorUrl);
    await page.goto(salesNavigatorUrl, { waitUntil: "networkidle2", timeout: 60000 });

    const allProfiles = [];
    let hasNextPage = true;

    while (hasNextPage) {
      try {
        // Wait for profiles to load
        await page.waitForSelector("div.artdeco-entity-lockup__content", { timeout: 30000 });

        // Scrape profiles on the current page
        const profiles = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("div.artdeco-entity-lockup__content")).map((profile): LinkedInProfile => {
                const nameElement = profile.querySelector(".artdeco-entity-lockup__title a span");
                const positionElement = profile.querySelector(".artdeco-entity-lockup__subtitle span[data-anonymize='title']");
                const companyElement = profile.querySelector(".artdeco-entity-lockup__subtitle a");
                const locationElement = profile.querySelector(".artdeco-entity-lockup__caption span");
                const profileLinkElement = profile.querySelector(".artdeco-entity-lockup__title a");

                return {
                    name: nameElement?.textContent?.trim() ?? null,
                    position: positionElement?.textContent?.trim() ?? null,
                    company: companyElement?.textContent?.trim() ?? null,
                    location: locationElement?.textContent?.trim() ?? null,
                    isPremium: !!profile.querySelector('li-icon[type="linkedin-premium-gold-icon"]'),
                    profileLink: profileLinkElement?.getAttribute("href") ?? null
                };
          });
        });

        console.log("Premium profiles on this page:", profiles.filter((p) => p.isPremium));
        allProfiles.push(...profiles.filter((p) => p.isPremium));

        // Check if the "Next" button exists and is enabled
        const nextButton = await page.$("button.artdeco-pagination__button--next");
        if (!nextButton) {
          console.log("No 'Next' button found. Scraping complete.");
          hasNextPage = false;
        } else {
          const isNextButtonDisabled = await page.evaluate(
            (button) => button.disabled,
            nextButton
          );

          if (isNextButtonDisabled) {
            console.log("Next button is disabled. No more pages to scrape.");
            hasNextPage = false;
          } else {
            console.log("Navigating to the next page...");
            await nextButton.click();

            // Replace waitForTimeout with a manual delay
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        }
      } catch (paginationError) {
        console.error("Error during pagination:", paginationError instanceof Error ? paginationError.message : String(paginationError));
        hasNextPage = false; // Exit loop if pagination fails
      }
    }

    console.log("All Premium Profiles Scraped:", allProfiles);
    return allProfiles;
  } catch (error) {
    console.error("Error during scraping:", error instanceof Error ? error.message : String(error));
    throw new Error("Scraping failed.");
  } finally {
    await browser.close();
  }
}