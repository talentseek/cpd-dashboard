// src/app/admin/page.tsx

import { AdminLayout } from '@/components/AdminLayout'
import { DashboardComponent } from '@/components/admindashboard'

export default function DashboardPage() {
  return (
    <AdminLayout>
      <DashboardComponent />
    </AdminLayout>
  )
}