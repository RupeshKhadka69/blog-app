import { requireAuth } from '@/utils/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: requireAuth
})

function RouteComponent() {
  return <div>Hello "/dashboardRoutes"!</div>
}
