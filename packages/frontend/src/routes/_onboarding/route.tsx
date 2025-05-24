import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { getSession, useSession, signOut } from "../../lib/auth";

export const Route = createFileRoute("/_onboarding")({
  beforeLoad: async () => {
    const { data: session } = await getSession();
    if (!session) return redirect({ to: "/signup" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const session = useSession();
  const navigate = useNavigate();
  const imgUrl = session.data?.user.image ?? "";

  const logout = async () => {
    await signOut();
    navigate({ to: "/signup" });
  };

  return (
    <>
      <div className="flex flex-row justify-end p-2">
        <div className="avatar">
          <div className="w-8 rounded-full mr-5 cursor-pointer">
            <img src={imgUrl} />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-log-out-icon lucide-log-out mr-4 w-8 h-8 cursor-pointer"
            onClick={logout}
          >
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          </svg>
        </div>
      </div>
      <div className="flex flex-row h-screen justify-center items-center">
        <Outlet />
      </div>
    </>
  );
}
