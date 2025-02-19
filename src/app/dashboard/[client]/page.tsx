'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/utils';
import ClientLayout from '@/components/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

// -----------------------------------------------
// Type definitions
// -----------------------------------------------
interface Lead {
  id: string;
  client: string;
  first_name: string;
  last_name: string;
  company: string;
  linkedin?: string;
  website?: string;
  position?: string;
  created_at?: string;
}

// -----------------------------------------------
// Helper: Constructs the landing page URL slug
// -----------------------------------------------
function constructLandingPageURL(lead: Lead): string {
  if (!lead.first_name || !lead.last_name || !lead.company) {
    console.warn("🚨 Missing lead details for landing page:", lead);
    return `/landing-page/${encodeURIComponent(lead.id)}?linkedin=true`;
  }
  const firstName = lead.first_name.toLowerCase();
  const lastInitial = lead.last_name.charAt(0).toLowerCase();
  const companySlug = lead.company.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `/${firstName}${lastInitial}.${companySlug}`;
}

// -----------------------------------------------
// Main Dashboard Component
// -----------------------------------------------
export default function ClientDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalPageViews, setTotalPageViews] = useState(0);
  const [totalLeadsCount, setTotalLeadsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [clientId, setClientId] = useState<number | null>(null);
  const router = useRouter();
  const { client } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        // Get authenticated user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error('User not authenticated:', userError);
          router.push('/login');
          return;
        }

        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (profileError || !profile) {
          console.error('Error fetching user profile:', profileError);
          router.push('/unauthorized');
          return;
        }
        setClientId(Number(profile.client_id));

        // Get client details
        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('client_name, status')
          .eq('id', profile.client_id)
          .single();
        if (clientError || !clientData) {
          console.error('Error fetching client data:', clientError);
          return;
        }
        if (clientData.status === 'pending') {
          router.push(`/dashboard/${client}/quick-start`);
          return;
        }

        // 1) Fetch total leads count (excluding unqualified)
        const { count: leadsCount, error: leadsCountError } = await supabase
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .eq('client_id', profile.client_id)
          .neq('status', 'unqualified');
        if (leadsCountError) {
          console.error('Error fetching total leads count:', leadsCountError);
        } else {
          setTotalLeadsCount(leadsCount || 0);
        }

        // 2) Fetch lead IDs (for page views query, excluding unqualified)
        const { data: leadIdsData, error: leadIdsError } = await supabase
          .from('leads')
          .select('id')
          .eq('client_id', profile.client_id)
          .neq('status', 'unqualified');
        if (leadIdsError) {
          console.error('Error fetching lead IDs:', leadIdsError);
        }
        const leadIds = leadIdsData ? leadIdsData.map((lead) => lead.id) : [];

        // 3) Fetch total page views using the "in" operator over the lead IDs
        let pageViews = 0;
        if (leadIds.length > 0) {
          const { count, error: pageViewsError } = await supabase
            .from('abm_page_visits')
            .select('id', { count: 'exact', head: true })
            .in('lead_id', leadIds);
          if (pageViewsError) {
            console.error('Error fetching page views:', pageViewsError);
          } else {
            pageViews = count || 0;
          }
        }
        setTotalPageViews(pageViews);

        // 4) Fetch full leads data (excluding unqualified)
        const { data: leadsData, error: leadsError } = await supabase
          .from('leads')
          .select('*')
          .eq('client_id', profile.client_id)
          .neq('status', 'unqualified');
        if (leadsError) {
          console.error('Error fetching leads:', leadsError);
        } else {
          setLeads(leadsData || []);
        }
      } catch (error) {
        console.error('Error during data fetching:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [client, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ClientLayout>
      <div className="p-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <ArrowUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeadsCount}</div>
              <p className="text-xs text-green-600">+0% from last period (static for now)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
              <ArrowDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPageViews}</div>
              <p className="text-xs text-red-600">-0% from last period (static for now)</p>
            </CardContent>
          </Card>
        </div>

        {/* Qualification Section for Client 23 */}
        {clientId === 23 && <QualificationSection leads={leads} />}
      </div>
    </ClientLayout>
  );
}

// -----------------------------------------------
// Qualification Section Component (for Client 23)
// -----------------------------------------------
function QualificationSection({ leads }: { leads: Lead[] }) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editedCompany, setEditedCompany] = useState<string>('');
  const router = useRouter();

  // When a lead is selected, initialize editedCompany with its current company
  useEffect(() => {
    if (selectedLead) {
      setEditedCompany(selectedLead.company);
    }
  }, [selectedLead]);

  // Compute a simple preview message using lead data.
  // Note: Uses "wearepayaca.com" as the base domain.
  const computePreviewMessage = (lead: Lead): string => {
    return `
Hi ${lead.first_name},

I took a look at ${editedCompany} and it seems like we could connect you with prospects who might be interested in our solutions.

We work on a performance-based model, billing only when we deliver results.

Would you be open to a quick meeting?

https://wearepayaca.com${constructLandingPageURL(lead)}
    `.trim();
  };

  // Handler for updating the company name
  const handleUpdateCompany = async () => {
    if (!selectedLead) return;
    try {
      const response = await fetch("/api/cpd-update-personalization", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: selectedLead.id, company: editedCompany }),
      });
      if (response.ok) {
        alert("Company name updated!");
        window.location.reload();
      } else {
        alert("Error updating company name");
      }
    } catch (error) {
      console.error("Update company error:", error);
      alert("Failed to update company name");
    }
  };

  // Handler for marking a lead as qualified (status "interested")
  const handleQualify = async () => {
    if (!selectedLead) return;
    const confirmQualify = confirm(
      `Mark ${selectedLead.first_name} ${selectedLead.last_name} as qualified (interested)?`
    );
    if (!confirmQualify) return;
    try {
      const response = await fetch("/api/cpd-update-personalization", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: selectedLead.id, status: "interested" }),
      });
      if (response.ok) {
        alert("Lead marked as qualified!");
        window.location.reload();
      } else {
        alert("Error marking lead as qualified");
      }
    } catch (error) {
      console.error("Qualify error:", error);
      alert("Failed to mark lead as qualified");
    }
  };

  // Handler for marking a lead as unqualified (status "unqualified")
  const handleUnqualify = async () => {
    if (!selectedLead) return;
    const confirmUnqualify = confirm(
      `Mark ${selectedLead.first_name} ${selectedLead.last_name} as unqualified?`
    );
    if (!confirmUnqualify) return;
    try {
      const response = await fetch("/api/cpd-update-personalization", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: selectedLead.id, status: "unqualified" }),
      });
      if (response.ok) {
        alert("Lead marked as unqualified!");
        window.location.reload();
      } else {
        alert("Error marking lead as unqualified");
      }
    } catch (error) {
      console.error("Unqualify error:", error);
      alert("Failed to mark lead as unqualified");
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Qualification Section</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {leads.length === 0 ? (
          <p>No leads available for qualification.</p>
        ) : (
          leads.map((lead) => (
            <Card
              key={lead.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedLead(lead)}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold">
                    {lead.first_name} {lead.last_name}
                  </h3>
                  {lead.linkedin && (
                    <a
                      href={lead.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2"
                    >
                      <Linkedin className="h-5 w-5 text-blue-500" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {lead.position} at {lead.company}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      {selectedLead && (
        <div className="mt-6 p-4 border rounded bg-white">
          <h3 className="font-bold mb-2">
            {selectedLead.first_name} {selectedLead.last_name}
          </h3>
          <p className="mb-2 text-gray-600">
            {selectedLead.position} at {selectedLead.company}
          </p>
          {/* Editable Company Name */}
          <div className="mt-4">
            <label className="block font-semibold">Company Name:</label>
            <input
              type="text"
              value={editedCompany}
              onChange={(e) => setEditedCompany(e.target.value)}
              className="w-full border rounded p-2 mt-2"
            />
            <Button
              variant="outline"
              className="mt-2"
              onClick={handleUpdateCompany}
            >
              Update Company
            </Button>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Message Preview:</h4>
            <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-sm">
              {computePreviewMessage(selectedLead)}
            </pre>
          </div>
          <div className="mt-4 flex gap-4">
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
  );
}