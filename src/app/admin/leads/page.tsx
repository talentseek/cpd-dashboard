// src/app/admin/leads/page.tsx
'use client';

import { AdminLayout } from '@/components/AdminLayout';

export default function LeadsPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Leads</h1>
        <p className="text-gray-600">Manage all your leads from this panel.</p>
      </div>
    </AdminLayout>
  );
}