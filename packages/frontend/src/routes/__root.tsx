import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext()({
  component: () => RootComponent,
  notFoundComponent: () => <div>Could not find what you were looking for</div>,
});

function RootComponent() {
  return (
    <>
      <div className="flex flex-row h-screen justify-center items-center">
        <div>
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
