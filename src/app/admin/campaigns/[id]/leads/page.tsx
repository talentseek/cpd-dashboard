"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ImportLeads from "@/components/campaigns/ImportLeads";
import ScrapeResultsTable from "@/components/campaigns/ScrapeResultsTable";

// Define the types for the API response
interface ApiResult {
  url: string;
  openProfiles: number;
  otherProfiles: number;
  status: string;
}

interface ApiResponse {
  results: ApiResult[];
  totals: {
    openProfiles: number;
    otherProfiles: number;
  };
}

// Define the type for the results state
interface Result extends ApiResult {
  leadsFound: number;
}

const CampaignLeadsPage: React.FC = () => {
  const params = useParams();
  const campaignId = parseInt(params.id as string, 10); // Dynamically extract campaignId from the URL

  const [results, setResults] = useState<Result[]>([]);
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

        const data: ApiResponse = await response.json(); // Use the ApiResponse type

        // Map API response to include leadsFound for each result
        const mappedResults: Result[] = data.results.map((result) => ({
          ...result,
          leadsFound: result.openProfiles + result.otherProfiles, // Calculate leadsFound
        }));

        setResults(mappedResults);
        setTotalLeads(data.totals.openProfiles + data.totals.otherProfiles);
        setTotalOpenProfiles(data.totals.openProfiles);
        setTotalOtherProfiles(data.totals.otherProfiles);
      } catch (error) {
        console.error("Error fetching leads data:", error);
      }
    };

    if (!isNaN(campaignId)) {
      fetchResults();
    }
  }, [campaignId]);

  const handleAddSearch = async (url: string) => {
    const newResult: Result = {
      url,
      openProfiles: 0,
      otherProfiles: 0,
      leadsFound: 0, // Initialize with 0
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
        totalLeads={totalLeads || 0}
        totalOpenProfiles={totalOpenProfiles || 0}
        totalOtherProfiles={totalOtherProfiles || 0}
      />
    </div>
  );
};

export default CampaignLeadsPage;