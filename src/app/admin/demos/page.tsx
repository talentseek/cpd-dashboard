// src/app/admin/demos/page.tsx

import { AdminLayout } from '@/components/AdminLayout'
import DemosList from '@/components/demos-list'

export default function DemosPage() {
  return (
    <AdminLayout>
      <DemosList />
    </AdminLayout>
  )
}