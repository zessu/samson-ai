import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "../../pages/dashboard";

export const Route = createFileRoute("/_onboarding/")({
  component: Main,
});

function Main() {
  return <Dashboard />;
}
