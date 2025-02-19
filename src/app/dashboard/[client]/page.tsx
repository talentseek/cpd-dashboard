'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/utils';
import ClientLayout from '@/components/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Linkedin } from 'lucide-react';
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
    console.warn('🚨 Missing lead details for landing page:', lead);
    return `/landing-page/${encodeURIComponent(lead.id)}?linkedin=true`;
  }
  const firstName = lead.first_name.toLowerCase();
  const lastInitial = lead.last_name.charAt(0).toLowerCase();
  const companySlug = lead.company.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `/${firstName}${lastInitial}.${companySlug}`;
}

// -----------------------------------------------
// Main Dashboard Component
// -----------------------------------------------
export default function ClientDashboardPage() {
  const [pendingLeads, setPendingLeads] = useState<Lead[]>([]);
  const [totalQualified, setTotalQualified] = useState(0);
  const [totalUnqualified, setTotalUnqualified] = useState(0);
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
        const clientIdNum = Number(profile.client_id);
        setClientId(clientIdNum);

        // Get client details
        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('client_name, status')
          .eq('id', clientIdNum)
          .single();
        if (clientError || !clientData) {
          console.error('Error fetching client data:', clientError);
          return;
        }
        if (clientData.status === 'pending') {
          router.push(`/dashboard/${client}/quick-start`);
          return;
        }

        // Fetch summary counts:
        // Qualified leads (status "interested")
        const { count: qualifiedCount, error: qualifiedError } = await supabase
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .eq('client_id', clientIdNum)
          .eq('status', 'interested');
        if (qualifiedError) {
          console.error('Error fetching qualified count:', qualifiedError);
        }
        // Unqualified leads (status "unqualified")
        const { count: unqualifiedCount, error: unqualifiedError } = await supabase
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .eq('client_id', clientIdNum)
          .eq('status', 'unqualified');
        if (unqualifiedError) {
          console.error('Error fetching unqualified count:', unqualifiedError);
        }
        setTotalQualified(qualifiedCount || 0);
        setTotalUnqualified(unqualifiedCount || 0);

        // Fetch pending leads details (only those with status "not_replied")
const { data: leadsData, error: leadsError } = await supabase
  .from('leads')
  .select('*')
  .eq('client_id', clientIdNum)
  .eq('status', 'not_replied');
if (leadsError) {
  console.error('Error fetching pending leads:', leadsError);
} else {
  setPendingLeads(leadsData || []);
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
              <CardTitle className="text-sm font-medium">Total Qualified</CardTitle>
              <ArrowUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalQualified}</div>
              <p className="text-xs text-green-600">Qualified leads count</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Unqualified</CardTitle>
              <ArrowDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUnqualified}</div>
              <p className="text-xs text-red-600">Unqualified leads count</p>
            </CardContent>
          </Card>
        </div>

        {/* Qualification Section for Client 23 */}
        {clientId === 23 && (
          <QualificationSection
            pendingLeads={pendingLeads}
            setPendingLeads={setPendingLeads}
            onProcessed={(action: 'qualified' | 'unqualified') => {
              // Update summary counts locally
              if (action === 'qualified') {
                setTotalQualified((prev) => prev + 1);
              } else {
                setTotalUnqualified((prev) => prev + 1);
              }
            }}
          />
        )}
      </div>
    </ClientLayout>
  );
}

// -----------------------------------------------
// Qualification Section Component (for Client 23)
// -----------------------------------------------
interface QualificationSectionProps {
pendingLeads: Lead[];
setPendingLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
onProcessed: (action: 'qualified' | 'unqualified') => void;
}

function QualificationSection({
  pendingLeads,
  setPendingLeads,
  onProcessed,
}: QualificationSectionProps) {
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [editedCompany, setEditedCompany] = useState<string>('');
  const router = useRouter();

  // When a lead is expanded, initialize editedCompany with its current company.
  const handleToggleExpand = (lead: Lead) => {
    if (expandedLeadId === lead.id) {
      setExpandedLeadId(null);
    } else {
      setExpandedLeadId(lead.id);
      setEditedCompany(lead.company);
    }
  };

  // Compute preview message using the (possibly) edited company name.
  // Uses "wearepayaca.com" as the base domain.
  const computePreviewMessage = (lead: Lead): string => {
    return `
Hi ${lead.first_name},

I took a look at ${editedCompany} and it seems like we could connect you with prospects who might be interested in our solutions.

We work on a performance-based model, billing only when we deliver results.

Would you be open to a quick meeting?

https://wearepayaca.com${constructLandingPageURL(lead)}
    `.trim();
  };

  // Handler to update company name
  const handleUpdateCompany = async (lead: Lead) => {
    try {
      const response = await fetch('/api/cpd-update-personalization', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, company: editedCompany }),
      });
      if (response.ok) {
        // Update the lead locally:
        setPendingLeads((prev) =>
          prev.map((l) => (l.id === lead.id ? { ...l, company: editedCompany } : l))
        );
      } else {
        alert('Error updating company name');
      }
    } catch (error) {
      console.error('Update company error:', error);
      alert('Failed to update company name');
    }
  };

  // Handler for marking a lead as qualified (status "interested")
  const handleQualify = async (lead: Lead) => {
    try {
      const response = await fetch('/api/cpd-update-personalization', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, status: 'interested' }),
      });
      if (response.ok) {
        // Remove lead from pending list
        setPendingLeads((prev) => prev.filter((l) => l.id !== lead.id));
        onProcessed('qualified');
        if (expandedLeadId === lead.id) {
          setExpandedLeadId(null);
        }
      } else {
        alert('Error marking lead as qualified');
      }
    } catch (error) {
      console.error('Qualify error:', error);
      alert('Failed to mark lead as qualified');
    }
  };

  // Handler for marking a lead as unqualified (status "unqualified")
  const handleUnqualify = async (lead: Lead) => {
    try {
      const response = await fetch('/api/cpd-update-personalization', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, status: 'unqualified' }),
      });
      if (response.ok) {
        setPendingLeads((prev) => prev.filter((l) => l.id !== lead.id));
        onProcessed('unqualified');
        if (expandedLeadId === lead.id) {
          setExpandedLeadId(null);
        }
      } else {
        alert('Error marking lead as unqualified');
      }
    } catch (error) {
      console.error('Unqualify error:', error);
      alert('Failed to mark lead as unqualified');
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Qualification Section</h2>
      {pendingLeads.length === 0 ? (
        <p>No pending leads available for qualification.</p>
      ) : (
        <div className="space-y-4">
          {pendingLeads.map((lead) => (
            <Card
              key={lead.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleToggleExpand(lead)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
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
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="h-5 w-5 text-blue-500" />
                      </a>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {expandedLeadId === lead.id ? '▲' : '▼'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {lead.position} at {lead.company}
                </p>
                {expandedLeadId === lead.id && (
                  <div className="mt-4 border-t pt-4">
                    <div>
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateCompany(lead);
                        }}
                      >
                        Update Company
                      </Button>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold">Message Preview:</h4>
                      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-sm">
                        {computePreviewMessage(lead)}
                      </pre>
                    </div>
                    <div className="mt-4 flex gap-4">
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQualify(lead);
                        }}
                      >
                        Qualify (Interested)
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnqualify(lead);
                        }}
                      >
                        Mark as Unqualified
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}