import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/setup" className="[&.active]:font-bold">
          Setup
        </Link>{" "}
        <Link to="/signup" className="[&.active]:font-bold">
          Sign up
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => (
    <div>404: What you are looking for does not exist!</div>
  ),
});
