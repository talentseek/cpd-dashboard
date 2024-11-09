// src/app/admin/tasks/page.tsx

import { AdminLayout } from '@/components/AdminLayout'
import { TasksDashboardComponent } from '@/components/tasks-dashboard'

export default function TasksPage() {
  return (
    <AdminLayout>
      <TasksDashboardComponent />
    </AdminLayout>
  )
}