import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-row h-screen justify-center items-center">
        <div><Outlet /></div>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => (
    <div>404: What you are looking for does not exist!</div>
  ),
});
