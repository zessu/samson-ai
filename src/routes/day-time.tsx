import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/day-time')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/day-time"!</div>
}
