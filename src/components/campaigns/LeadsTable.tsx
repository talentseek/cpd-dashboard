'use client';

type Lead = {
  id: number;
  name: string;
  email: string;
  status: string;
};

export default function LeadsTable({
  leads,
  onMessage,
  onDelete,
}: {
  leads: Lead[];
  onMessage: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Leads Table</h2>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="px-6 py-4 whitespace-nowrap">{lead.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lead.status}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                  onClick={() => onMessage(lead.id)}
                >
                  Message
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  onClick={() => onDelete(lead.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}