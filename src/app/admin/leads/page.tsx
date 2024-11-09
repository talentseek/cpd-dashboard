// src/app/admin/leads/page.tsx

import { AdminLayout } from '@/components/AdminLayout'
import { LeadsListComponent } from '@/components/leads-list'

export default function LeadsPage() {
  return (
    <AdminLayout>
      <LeadsListComponent />
    </AdminLayout>
  )
}