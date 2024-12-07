// src/app/admin/tasks/page.tsx
'use client';

import { AdminLayout } from '@/components/AdminLayout';

export default function TasksPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <p className="text-gray-600">View and manage all assigned tasks here.</p>
      </div>
    </AdminLayout>
  );
}