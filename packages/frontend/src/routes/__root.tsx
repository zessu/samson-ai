import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const RootComponent = () => {
  return (
    <>
      <div className="">
        <div>
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  );
};
export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => (
    <div>404: What you are looking for does not exist!</div>
  ),
});
