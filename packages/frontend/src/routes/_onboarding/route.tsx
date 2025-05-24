import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getSession, useSession } from "../../lib/auth";

export const Route = createFileRoute("/_onboarding")({
  beforeLoad: async () => {
    const { data: session } = await getSession();
    if (!session) return redirect({ to: "/signup" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const session = useSession();
  const imgUrl = session.data?.user.image ?? "";
  return (
    <>
      <div className="flex flex-row justify-end p-2">
        <div className="avatar">
          <div className="w-8 rounded-full mr-5 cursor-pointer">
            <img src={imgUrl} />
          </div>
        </div>
      </div>
      <div className="flex flex-row h-screen justify-center items-center">
        <Outlet />
      </div>
    </>
  );
}
