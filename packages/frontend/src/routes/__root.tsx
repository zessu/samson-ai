import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { getSession } from "../lib/auth";

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { data: session } = await getSession();
    // if (!session) return redirect({ to: "/signup" });
  },
  component: () => (
    <>
      <div className="flex flex-row h-screen justify-center items-center">
        <div>
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => (
    <div>404: What you are looking for does not exist!</div>
  ),
});
