'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { SchedulePayload, ScheduleResponse } from '@/types/campaign';

interface Lead {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  linkedin: string;
  is_open_profile: boolean;
  company: string; // Matches the database field
}

interface Message {
  id: number;
  step_order: number;
  subject: string;
  body: string;
}

const LIMIT = 25; // Number of leads per page

// Function to construct the landing page URL
const generateLandingPageURL = (lead: Lead, clientSubdomain: string | null): string => {
  if (!clientSubdomain) {
    return '(No Landing Page)';
  }

  const firstNameLower = lead.first_name.toLowerCase();
  const surnameInitial = lead.last_name.charAt(0).toUpperCase();
  const normalizedCompany = lead.company
    ? lead.company.toLowerCase().replace(/\s+/g, '')
    : ''; // Use empty string if company is missing

  const leadIdentifier = `${firstNameLower}${surnameInitial}${normalizedCompany ? `.${normalizedCompany}` : ''}`;
  return `https://${clientSubdomain}/${leadIdentifier}?linkedin=true`;
};

// Function to handle placeholder replacements
const personalizeText = (text: string, lead: Lead, clientSubdomain: string | null): string => {
  const landingPageURL = generateLandingPageURL(lead, clientSubdomain);

  return text
    .replace(/{first_name}/g, lead.first_name)
    .replace(/{last_name}/g, lead.last_name)
    .replace(/{company_name}/g, lead.company || '(No Company)')
    .replace(/{position}/g, lead.position || '(No Position)')
    .replace(/{landingpage}/g, landingPageURL);
};

export default function CampaignPreviewPage() {
  const params = useParams();
  const campaignId = parseInt(params.id as string, 10);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [clientSubdomain, setClientSubdomain] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalLeads, setTotalLeads] = useState<number>(0); // For total leads count
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]); // Selected leads for scheduling

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch campaign data to get the client ID
        const campaignRes = await fetch(`/api/campaigns/${campaignId}`);
        if (!campaignRes.ok) {
          throw new Error('Failed to fetch campaign data');
        }
        const { client_id } = await campaignRes.json();

        // Fetch client subdomain
        const clientRes = await fetch(`/api/clients/subdomain?clientId=${client_id}`);
        if (!clientRes.ok) {
          throw new Error('Failed to fetch client subdomain');
        }
        const { subdomain } = await clientRes.json();
        setClientSubdomain(subdomain || null);

        // Fetch sequence messages
        const messagesRes = await fetch(`/api/campaigns/${campaignId}/sequence`);
        if (!messagesRes.ok) {
          throw new Error('Failed to fetch sequence messages');
        }
        const messagesData = await messagesRes.json();

        const sortedMessages = messagesData.sort((a: Message, b: Message) => a.step_order - b.step_order);
        setMessages(sortedMessages);
        setCurrentStep(sortedMessages.length > 0 ? sortedMessages[0].step_order : 1);

        // Fetch initial leads
        await fetchLeads(currentPage);
        setLoading(false);
    } catch (error) {
    console.error('Error fetching preview data:', error instanceof Error ? error.message : 'Unknown error');
    setLoading(false);
      }
    };

    const fetchLeads = async (page: number) => {
      try {
        const leadsRes = await fetch(`/api/campaigns/${campaignId}/open-profiles?page=${page}&limit=${LIMIT}`);
        if (!leadsRes.ok) {
          throw new Error('Failed to fetch leads');
        }
        const { leads, total } = await leadsRes.json();
        setLeads(leads);
        setTotalLeads(total || 0); // Set total leads for pagination
    } catch (error) {
    console.error('Error fetching leads:', error instanceof Error ? error.message : 'Unknown error');
    }
    };

    fetchData();
  }, [campaignId, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectLead = (leadId: number) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    const currentLeadIds = leads.map((lead) => lead.id);

    if (currentLeadIds.every((id) => selectedLeads.includes(id))) {
      setSelectedLeads((prev) => prev.filter((id) => !currentLeadIds.includes(id))); // Deselect all
    } else {
      setSelectedLeads((prev) => [...new Set([...prev, ...currentLeadIds])]); // Select all
    }
  };

  const handleScheduleSelected = async () => {
    if (!selectedMessage) {
      alert('Please select a message step before scheduling.');
      return;
    }

    try {
    const payload: SchedulePayload = {
    leads: selectedLeads,
    scheduled_time: new Date().toISOString(), // Adjust to your scheduling logic
    raw_message: selectedMessage.body,
    raw_subject: selectedMessage.subject,
      };

      const res = await fetch(`/api/campaigns/${campaignId}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to schedule selected leads.');
      }

    const data = (await res.json()) as ScheduleResponse;
    if (data.success) {
        alert('Leads scheduled successfully!');
        setSelectedLeads([]); // Clear the selected leads
      } else {
        alert(`Error scheduling leads: ${data.error}`);
      }
    } catch (error) {
    console.error('Error scheduling leads:', error instanceof Error ? error.message : 'Unknown error');
    alert('Failed to schedule selected leads. Please try again.');
    }
};

const handleDeleteLead = async (leadId: number) => {
    try {
    const res = await fetch(`/api/campaigns/${campaignId}/leads/${leadId}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete lead');
    }

    // Remove the lead from local state
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
    // Also remove from selected leads if it was selected
    setSelectedLeads((prev) => prev.filter((id) => id !== leadId));
    alert('Lead deleted successfully');
    } catch (error) {
    console.error('Error deleting lead:', error instanceof Error ? error.message : 'Unknown error');
    alert('Failed to delete lead. Please try again.');
    }
};

if (loading) {
    return <p>Loading preview...</p>;
  }

  const selectedMessage = messages.find((message) => message.step_order === currentStep);
  const totalPages = Math.ceil(totalLeads / LIMIT);
  const startLead = (currentPage - 1) * LIMIT + 1;
  const endLead = Math.min(currentPage * LIMIT, totalLeads);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Preview Campaign</h1>
      <p className="mb-4 text-gray-600">View all open profiles and the personalized messages associated with them.</p>

      {/* Sequence Step Selector */}
      <div className="mb-6">
        <label htmlFor="sequence-step" className="block text-sm font-medium text-gray-700">
          Select Sequence Step
        </label>
        <select
          id="sequence-step"
          value={currentStep}
          onChange={(e) => setCurrentStep(parseInt(e.target.value, 10))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          {messages.map((message) => (
            <option key={message.id} value={message.step_order}>
              Step {message.step_order}: {message.subject || '(No Subject)'}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleScheduleSelected}
          disabled={selectedLeads.length === 0}
          className="px-4 py-2 bg-green-500 text-white rounded-md disabled:opacity-50"
        >
          Schedule Selected ({selectedLeads.length})
        </button>
        <span>
          Showing {startLead}–{endLead} of {totalLeads} leads
        </span>
      </div>

      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={leads.every((lead) => selectedLeads.includes(lead.id))}
            onChange={handleSelectAll}
          />{' '}
          Select All
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {leads.map((lead) => (
          <div key={lead.id} className="border p-4 rounded-md relative">
            <button
              onClick={() => handleDeleteLead(lead.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              title="Delete Lead"
            >
              X
            </button>
            <label>
              <input
                type="checkbox"
                checked={selectedLeads.includes(lead.id)}
                onChange={() => handleSelectLead(lead.id)}
              />{' '}
              <strong>{lead.first_name} {lead.last_name}</strong>
            </label>
            <p>{lead.position}</p>
            <a
              href={lead.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View LinkedIn Profile
            </a>
            <div className="mt-4">
              <h3 className="text-md font-bold">Message Preview</h3>
              {selectedMessage ? (
                <div>
                  <p>
                    <strong>Subject:</strong>{' '}
                    {personalizeText(selectedMessage.subject || '(No Subject)', lead, clientSubdomain)}
                  </p>
                  <p>
                    <strong>Body:</strong>{' '}
                    {personalizeText(selectedMessage.body || '(No Body)', lead, clientSubdomain)}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No message assigned.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center mt-6">
        <div className="flex justify-between items-center w-full max-w-md">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}