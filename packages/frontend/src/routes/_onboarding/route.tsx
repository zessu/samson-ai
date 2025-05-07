import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getSession } from "../../lib/auth";

export const Route = createFileRoute("/_onboarding")({
  beforeLoad: async () => {
    const { data: session } = await getSession();
    if (!session) return redirect({ to: "/signup" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
