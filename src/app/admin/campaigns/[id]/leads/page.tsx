"use client";

import React, { useState } from "react";
import ImportLeads from "@/components/campaigns/ImportLeads";
import ScrapeResultsTable from "@/components/campaigns/ScrapeResultsTable";

interface ScrapeResult {
  url: string;
  leadsFound: number;
  duplicatesFound: number;
  status: "In Progress" | "Completed" | "Failed";
}

const CampaignLeadsPage: React.FC = () => {
  const [results, setResults] = useState<ScrapeResult[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalDuplicates, setTotalDuplicates] = useState(0);

  const handleAddSearch = (url: string) => {
    const newResult: ScrapeResult = {
      url,
      leadsFound: 0,
      duplicatesFound: 0,
      status: "In Progress",
    };

    setResults((prevResults) => [...prevResults, newResult]);

    // Simulate scraping process
    simulateScraping(url);
  };

  const simulateScraping = (url: string) => {
    setTimeout(() => {
      const leadsFound = Math.floor(Math.random() * 100); // Random number for leads
      const duplicatesFound = Math.floor(Math.random() * leadsFound * 0.3); // Random number for duplicates

      setResults((prevResults) =>
        prevResults.map((result) =>
          result.url === url
            ? {
                ...result,
                leadsFound,
                duplicatesFound,
                status: "Completed",
              }
            : result
        )
      );

      setTotalLeads((prevTotal) => prevTotal + leadsFound);
      setTotalDuplicates((prevTotal) => prevTotal + duplicatesFound);
    }, 3000); // Simulated delay of 3 seconds
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
      />
    </div>
  );
};

export default CampaignLeadsPage;