"use client";

import React from "react";

interface ScrapeResultsTableProps {
  results: {
    url: string;
    leadsFound: number;
    duplicatesFound: number;
    premiumProfiles: number;
    openProfiles: number;
    status: "In Progress" | "Completed" | "Failed";
  }[];
  totalLeads: number;
  totalDuplicates: number;
  totalPremiumProfiles: number;
  totalOpenProfiles: number;
}

const ScrapeResultsTable: React.FC<ScrapeResultsTableProps> = ({
  results,
  totalLeads,
  totalDuplicates,
  totalPremiumProfiles,
  totalOpenProfiles,
}) => {
  return (
    <div className="mt-6 bg-white shadow-md rounded-md p-4">
      <h3 className="text-lg font-semibold mb-4">Scrape Results</h3>

      {/* Summary */}
      <div className="mb-4">
        <p>Total Leads: {totalLeads}</p>
        <p>Total Duplicates: {totalDuplicates}</p>
        <p>Total Premium Profiles: {totalPremiumProfiles}</p>
        <p>Total Open Profiles: {totalOpenProfiles}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-left">Search URL</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Leads Found</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Duplicates</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Premium Profiles</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Open Profiles</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300 text-blue-600 break-all">
                  <a href={result.url} target="_blank" rel="noopener noreferrer">
                    {result.url}
                  </a>
                </td>
                <td className="px-4 py-2 border border-gray-300">{result.leadsFound}</td>
                <td className="px-4 py-2 border border-gray-300">{result.duplicatesFound}</td>
                <td className="px-4 py-2 border border-gray-300">{result.premiumProfiles}</td>
                <td className="px-4 py-2 border border-gray-300">{result.openProfiles}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {result.status === "In Progress" ? (
                    <span className="text-yellow-500">In Progress...</span>
                  ) : result.status === "Completed" ? (
                    <span className="text-green-500">Completed</span>
                  ) : (
                    <span className="text-red-500">Failed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScrapeResultsTable;