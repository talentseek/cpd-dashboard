"use client";

import React, { useState } from "react";

interface ImportLeadsProps {
  onAddSearch: (url: string) => void;
}

const ImportLeads: React.FC<ImportLeadsProps> = ({ onAddSearch }) => {
  const [url, setUrl] = useState("");

  const handleAddSearch = () => {
    const isValidUrl = /^https:\/\/www\.linkedin\.com\/sales\//.test(url);
    if (!isValidUrl) {
      alert("Invalid URL. Please provide a valid LinkedIn Sales Navigator URL.");
      return;
    }
    onAddSearch(url);
    setUrl(""); // Clear the input after adding
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-4">Add Sales Navigator Search URL</h3>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Enter Sales Navigator URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md"
        />
        <button
          onClick={handleAddSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ImportLeads;