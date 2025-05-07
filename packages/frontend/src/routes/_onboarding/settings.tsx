import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_onboarding/settings")({
  component: Profile,
});

function Profile() {
  return <div className="p-2">Hello from Settings!</div>;
}
