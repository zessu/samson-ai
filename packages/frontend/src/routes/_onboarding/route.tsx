import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getSession } from "../../lib/auth";

export const Route = createFileRoute("/_onboarding")({
  beforeLoad: async () => {
    const { data: session } = await getSession();
    console.log("session", session);
    if (!session) return redirect({ to: "/signup" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="flex flex-row justify-end p-2">
        <div className="avatar">
          <div className="w-8 rounded-full mr-5 cursor-pointer">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
          </div>
        </div>
      </div>
      <div className="flex flex-row h-screen justify-center items-center">
        <Outlet />
      </div>
    </>
  );
}
