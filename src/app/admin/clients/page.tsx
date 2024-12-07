// src/app/admin/clients/page.tsx
'use client';

import { AdminLayout } from '@/components/AdminLayout';

export default function ClientsPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Clients</h1>
        <p className="text-gray-600">Manage all your clients from this panel.</p>
      </div>
    </AdminLayout>
  );
}