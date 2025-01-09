"use client";

import React, { useState } from "react";
import ImportLeads from "@/components/campaigns/ImportLeads";
import ScrapeResultsTable from "@/components/campaigns/ScrapeResultsTable";

interface ScrapeResult {
  url: string;
  leadsFound: number;
  duplicatesFound: number;
  premiumProfiles: number;
  openProfiles: number;
  status: "In Progress" | "Completed" | "Failed";
}

const CampaignLeadsPage: React.FC = () => {
  const [results, setResults] = useState<ScrapeResult[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalDuplicates, setTotalDuplicates] = useState(0);
  const [totalPremiumProfiles, setTotalPremiumProfiles] = useState(0);
  const [totalOpenProfiles, setTotalOpenProfiles] = useState(0);

  const handleAddSearch = async (url: string) => {
    const newResult: ScrapeResult = {
      url,
      leadsFound: 0,
      duplicatesFound: 0,
      premiumProfiles: 0,
      openProfiles: 0,
      status: "In Progress",
    };

    setResults((prevResults) => [...prevResults, newResult]);

    // Replace with API call
    await scrapeProfiles(url);
  };

  const scrapeProfiles = async (url: string) => {
    try {
      const response = await fetch(`/api/leads/scrape`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error("Failed to scrape profiles");

      const data = await response.json();
      const { leadsFound, duplicatesFound, premiumProfiles, openProfiles } = data;

      setResults((prevResults) =>
        prevResults.map((result) =>
          result.url === url
            ? {
                ...result,
                leadsFound,
                duplicatesFound,
                premiumProfiles,
                openProfiles,
                status: "Completed",
              }
            : result
        )
      );

      setTotalLeads((prev) => prev + leadsFound);
      setTotalDuplicates((prev) => prev + duplicatesFound);
      setTotalPremiumProfiles((prev) => prev + premiumProfiles);
      setTotalOpenProfiles((prev) => prev + openProfiles);
    } catch (error) {
      console.error("Error during scraping:", error);
      setResults((prevResults) =>
        prevResults.map((result) =>
          result.url === url
            ? {
                ...result,
                status: "Failed",
              }
            : result
        )
      );
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
        totalLeads={totalLeads}
        totalDuplicates={totalDuplicates}
        totalPremiumProfiles={totalPremiumProfiles}
        totalOpenProfiles={totalOpenProfiles}
      />
    </div>
  );
};

export default CampaignLeadsPage;