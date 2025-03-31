import { createFileRoute } from '@tanstack/react-router'
import Home from '@/pages/Home'

export const Route:unknown = createFileRoute('/')({
  component: Home,
})

