"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";

// -----------------------------------------------
// Type definitions
// -----------------------------------------------
type Lead = {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  position: string;
  linkedin?: string;
  client_id?: number;
  website?: string;
  company_data?: Record<string, unknown>;
};

// -----------------------------------------------
// Helper: Constructs the landing page URL path
// -----------------------------------------------
function constructLandingPageURL(lead: Lead): string {
  if (!lead.first_name || !lead.last_name || !lead.company) {
    console.warn("🚨 Missing lead details for landing page:", lead);
    return `/landing-page/${encodeURIComponent(lead.id)}?linkedin=true`; // Fallback
  }
  const firstName = lead.first_name.toLowerCase();
  const lastInitial = lead.last_name.charAt(0).toLowerCase();
  const companySlug = lead.company.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `/${firstName}${lastInitial}.${companySlug}`;
}

// -----------------------------------------------
// Compute example message preview based on lead data
// -----------------------------------------------
function computePreviewMessage(lead: Lead): string {
  const message = `
Hi ${lead.first_name},

I took a look at ${lead.company} and it seems like we could connect you with prospects who might be interested in our solutions.

We work on a performance-based model, billing only when we deliver results.

Would you be open to a quick meeting?

https://costperdemo.com${constructLandingPageURL(lead)}
  `.trim();
  return message;
}

// -----------------------------------------------
// Main Component for Qualifying Leads
// -----------------------------------------------
export default function QualifyPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { client } = useParams();

  // -----------------------------------------------
  // Fetch Leads (using the same API; note that this endpoint
  // already excludes leads marked as unqualified)
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
  // Handle Qualify (mark as "interested")
  // -----------------------------------------------
  const handleQualify = async () => {
    if (!selectedLead) return;
    const confirmQualify = confirm(
      `Are you sure you want to mark ${selectedLead.first_name} ${selectedLead.last_name} as qualified (interested)?`
    );
    if (!confirmQualify) return;

    try {
      const response = await fetch("/api/cpd-update-personalization", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: selectedLead.id, status: "interested" }),
      });
      if (response.ok) {
        toast.success("Lead marked as qualified successfully!");
        window.location.reload();
      } else {
        toast.error("Error marking lead as qualified");
      }
    } catch (error) {
      console.error("❌ Qualify error:", error);
      toast.error("Failed to mark lead as qualified");
    }
  };

  // -----------------------------------------------
  // Handle Unqualify (mark as "unqualified")
  // -----------------------------------------------
  const handleUnqualify = async () => {
    if (!selectedLead) return;
    const confirmUnqualify = confirm(
      `Are you sure you want to mark ${selectedLead.first_name} ${selectedLead.last_name} as unqualified?`
    );
    if (!confirmUnqualify) return;

    try {
      const response = await fetch("/api/cpd-update-personalization", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: selectedLead.id, status: "unqualified" }),
      });
      if (response.ok) {
        toast.success("Lead marked as unqualified successfully!");
        window.location.reload();
      } else {
        toast.error("Error marking lead as unqualified");
      }
    } catch (error) {
      console.error("❌ Unqualify error:", error);
      toast.error("Failed to mark lead as unqualified");
    }
  };

  // -----------------------------------------------
  // Render
  // -----------------------------------------------
return (
<>
{client !== "23" ? (
    <p>Unauthorized access.</p>
) : (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Qualify Leads for Client 23</h1>

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
                  onClick={() => setSelectedLead(lead)}
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
              <h2 className="text-xl font-bold mb-2">
                {selectedLead.first_name} {selectedLead.last_name}
              </h2>
              <p className="text-gray-600 text-sm">
                {selectedLead.position} at {selectedLead.company}
              </p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Message Preview:</h3>
                <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-sm">
                  {computePreviewMessage(selectedLead)}
                </pre>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Button variant="outline" onClick={handleQualify}>
                  Qualify (Interested)
                </Button>
                <Button variant="destructive" onClick={handleUnqualify}>
                  Mark as Unqualified
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
) }
</>
);
}