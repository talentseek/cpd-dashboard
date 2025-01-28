"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ImportLeads from "@/components/campaigns/ImportLeads";
import ScrapeResultsTable from "@/components/campaigns/ScrapeResultsTable";
import { ScrapeResult, SearchUrlResult as LeadResult } from "@/types/campaign";

const CampaignLeadsPage: React.FC = () => {
  const params = useParams();
  const campaignId = parseInt(params.id as string, 10); // Dynamically extract campaignId from the URL

  const [results, setResults] = useState<ScrapeResult[]>([]);
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [totalOpenProfiles, setTotalOpenProfiles] = useState<number>(0);
  const [totalOtherProfiles, setTotalOtherProfiles] = useState<number>(0);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/campaigns/${campaignId}/leads`);
        if (!response.ok) {
          throw new Error("Failed to fetch leads data");
        }

        const data = await response.json();

        // Map results and calculate totals
        const mappedResults = data.results.map((result: LeadResult) => ({
            url: result.url,
            leadsFound: (result.open_profiles_found || 0) + (result.other_profiles_found || 0),
            openProfiles: result.open_profiles_found || 0,
            status: result.status,
        }));

        setResults(mappedResults);

        setTotalLeads(
          data.results.reduce(
            (sum: number, result: LeadResult) =>
            sum + (result.open_profiles_found || 0) + (result.other_profiles_found || 0),
            0
          )
        );
        setTotalOpenProfiles(
          data.results.reduce(
            (sum: number, result: LeadResult) => sum + (result.open_profiles_found || 0),
            0
          )
        );
        setTotalOtherProfiles(
          data.results.reduce(
            (sum: number, result: LeadResult) => sum + (result.other_profiles_found || 0),
            0
          )
        );
      } catch (error) {
        console.error("Error fetching leads data:", error);
      }
    };

    if (!isNaN(campaignId)) {
      fetchResults();
    }
  }, [campaignId]);

  const handleAddSearch = async (url: string) => {
    const newResult: ScrapeResult = {
      url,
      leadsFound: 0,
      openProfiles: 0,
      status: "In Progress",
    };

    setResults((prevResults) => [...prevResults, newResult]);

    try {
      const taskResponse = await fetch(`/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "scrape-linkedin-profiles",
          campaignId,
          searchUrl: url,
        }),
      });

      if (!taskResponse.ok) {
        throw new Error("Failed to create scraping task");
      }

      const schedulerResponse = await fetch(`/api/scheduler`, { method: "POST" });
      if (!schedulerResponse.ok) {
        throw new Error("Failed to process scraping task");
      }
    } catch (error) {
      console.error("Error creating or processing scraping task:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Leads Management</h1>
      <p className="text-gray-600 mb-6">
        Add new Sales Navigator searches and view scraping progress.
      </p>

      {/* Import Leads Section */}
      <ImportLeads onAddSearch={handleAddSearch} />

      {/* Scrape Results Table */}
      <ScrapeResultsTable
        results={results}
        totalLeads={totalLeads || 0} // Ensure no NaN
        totalOpenProfiles={totalOpenProfiles || 0} // Ensure no NaN
        totalOtherProfiles={totalOtherProfiles || 0} // Ensure no NaN
      />
    </div>
  );
};

export default CampaignLeadsPage;