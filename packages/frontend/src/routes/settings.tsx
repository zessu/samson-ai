import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: Profile,
});

function Profile() {
  return <div className="p-2">Hello from Settings!</div>;
}
