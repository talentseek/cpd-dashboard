// src/app/admin/leads/page.tsx
"use client";

import { AdminLayout } from "@/components/AdminLayout";
import LeadManagementTable from "@/components/LeadManagementTable";

export default function LeadsPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Leads</h1>
        <p className="text-gray-600 mb-6">Manage all your contacted leads from this panel.</p>

        {/* Lead Management Table Component */}
        <LeadManagementTable />
      </div>
    </AdminLayout>
  );
}