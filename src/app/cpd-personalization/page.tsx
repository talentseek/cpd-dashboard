"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// -----------------------------------------------
// Type definitions
// -----------------------------------------------
type Lead = {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  position: string;
  personalization: string | null;
  linkedin?: string;
  client_id?: number;
};

// -----------------------------------------------
// Helper: Constructs the landing page URL path in
// the "{firstName}{lastInitial}.{companySlug}" format.
// -----------------------------------------------
function constructLandingPageURL(lead: Lead): string {
  if (!lead.first_name || !lead.last_name || !lead.company) {
    console.warn("🚨 Missing lead details for landing page:", lead);
    return `/landing-page/${encodeURIComponent(lead.id)}?linkedin=true`; // Fallback URL
  }

  const firstName = lead.first_name.toLowerCase();
  const lastInitial = lead.last_name.charAt(0).toLowerCase();
  const companySlug = lead.company.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `/${firstName}${lastInitial}.${companySlug}`;
}

// -----------------------------------------------
// Main Component
// -----------------------------------------------
export default function CpdPersonalizationPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [updatedPersonalization, setUpdatedPersonalization] = useState<string>("{}");
  const [updatedFirstName, setUpdatedFirstName] = useState<string>("");
  const [updatedCompany, setUpdatedCompany] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // -----------------------------------------------
  // Fetch Leads
  // -----------------------------------------------
  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/cpd-update-personalization");
        const data = await response.json();
        if (response.ok) {
          console.log(`✅ Loaded ${data.length} leads`);
          setLeads(data);
        } else {
          toast.error("Error fetching leads");
        }
      } catch (error) {
        console.error("❌ Fetch error:", error);
        toast.error("Failed to load leads");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // -----------------------------------------------
  // Compute Preview Message
  // -----------------------------------------------
  const computePreviewMessage = (): string => {
    const baseMessage = `
Hi {first_name},

I took a look at {company}, and it seems like we could connect you with prospects such as {custom.roll1}, {custom.roll2}, and {custom.roll3}. Reaching out to {custom.industry1}, {custom.industry2}, and {custom.industry3} needing {custom.solution}.

We work on a performance-based model, billing only when we deliver results.

Would you be open to a quick meeting?

{cpdlanding}
    `.trim();

    // Use the updated fields (or fallback values) for placeholders:
    const safeFirstName = updatedFirstName || "there";
    const safeCompany = updatedCompany || "your company";

    // Parse the personalization JSON safely:
    let customFields: Record<string, string> = {};
    if (typeof updatedPersonalization === "string") {
      try {
        customFields = JSON.parse(updatedPersonalization);
      } catch (error) {
        console.error("Error parsing personalization JSON:", error);
      }
    } else if (typeof updatedPersonalization === "object" && updatedPersonalization !== null) {
      customFields = updatedPersonalization;
    }

    // Construct the landing page URL using the helper.
    // Create a "preview" lead that uses the updated first name and company.
    let cpdLandingPage = "https://costperdemo.com";
    if (selectedLead) {
      const previewLead: Lead = {
        ...selectedLead,
        first_name: updatedFirstName,
        company: updatedCompany,
      };
      cpdLandingPage += constructLandingPageURL(previewLead);
    }

    // Replace placeholders in the base message:
    let message = baseMessage
      .replace("{first_name}", safeFirstName)
      .replace("{company}", safeCompany)
      .replace("{cpdlanding}", cpdLandingPage);

    // Replace any {custom.KEY} placeholders with values from the parsed personalization JSON:
    message = message.replace(/\{custom\.(.*?)\}/g, (_, key) => {
      return customFields[key] ?? `{custom.${key}}`;
    });

    return message;
  };

  // -----------------------------------------------
  // Handle Lead Update (PATCH request)
  // -----------------------------------------------
  const handleUpdateLead = async () => {
    if (!selectedLead) return;

    try {
      const response = await fetch("/api/cpd-update-personalization", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: selectedLead.id,
          personalization: updatedPersonalization,
          first_name: updatedFirstName,
          company: updatedCompany,
        }),
      });

      if (response.ok) {
        toast.success("Lead updated successfully!");
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === selectedLead.id
              ? {
                  ...lead,
                  personalization: updatedPersonalization,
                  first_name: updatedFirstName,
                  company: updatedCompany,
                }
              : lead
          )
        );
        setSelectedLead(null);
        setUpdatedPersonalization("{}");
      } else {
        toast.error("Error updating lead");
      }
    } catch (error) {
      console.error("❌ Update error:", error);
      toast.error("Failed to update lead");
    }
  };

  // -----------------------------------------------
  // Render
  // -----------------------------------------------
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">
        Update Lead Details for CostPerDemo Leads
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading leads...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lead List */}
          <div className="space-y-4">
            {leads.length === 0 ? (
              <p className="text-gray-500">No leads found.</p>
            ) : (
              leads.map((lead) => (
                <Card
                  key={lead.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedLead(lead);
                    setUpdatedPersonalization(lead.personalization || "{}");
                    setUpdatedFirstName(lead.first_name);
                    setUpdatedCompany(lead.company);
                  }}
                >
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">
                      {lead.first_name} {lead.last_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lead.position} at {lead.company}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Lead Editor */}
          {selectedLead && (
            <div className="p-4 border rounded-lg bg-white">
              <div className="flex items-center">
                <h2 className="text-xl font-bold mb-2">
                  Editing {selectedLead.first_name} {selectedLead.last_name}
                </h2>
                {/* Render LinkedIn icon with link if available */}
                {selectedLead.linkedin && (
                  <a
                    href={selectedLead.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2"
                    title="View LinkedIn Profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="text-blue-600 hover:text-blue-800"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.039-1.852-3.039-1.853 0-2.136 1.445-2.136 2.939v5.669H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.372-1.852 3.605 0 4.27 2.372 4.27 5.456v6.287zM5.337 7.433c-1.144 0-2.07-.926-2.07-2.07 0-1.144.926-2.07 2.07-2.07 1.144 0 2.07.926 2.07 2.07 0 1.144-.926 2.07-2.07 2.07zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.553C0 23.229.792 24 1.771 24h20.451C23.205 24 24 23.229 24 22.277V1.723C24 .771 23.205 0 22.225 0z" />
                    </svg>
                  </a>
                )}
              </div>
              <p className="text-gray-600 text-sm">{selectedLead.position}</p>

              {/* Editable First Name */}
              <label className="block mt-4 font-semibold">First Name</label>
              <Input
                value={updatedFirstName}
                onChange={(e) => setUpdatedFirstName(e.target.value)}
                className="w-full mt-2"
              />

              {/* Editable Company */}
              <label className="block mt-4 font-semibold">Company</label>
              <Input
                value={updatedCompany}
                onChange={(e) => setUpdatedCompany(e.target.value)}
                className="w-full mt-2"
              />

              {/* Editable Personalization JSON */}
              <label className="block mt-4 font-semibold">Personalization JSON</label>
              <Textarea
                rows={6}
                value={updatedPersonalization}
                onChange={(e) => setUpdatedPersonalization(e.target.value)}
                className="w-full mt-2 border rounded p-2"
              />

              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleUpdateLead}
              >
                Save Changes
              </Button>

              {/* Message Preview */}
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Message Preview:</h3>
                <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-sm">
                  {computePreviewMessage()}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}