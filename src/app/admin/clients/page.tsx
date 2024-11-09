// src/app/admin/clients/page.tsx

import { AdminLayout } from '@/components/AdminLayout'
import { ClientsPageComponent } from '@/components/clients-page'

export default function ClientsPage() {
  return (
    <AdminLayout>
      <ClientsPageComponent />
    </AdminLayout>
  )
}