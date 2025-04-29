import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/setup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>we will show onboarding stuff here!</div>
}
