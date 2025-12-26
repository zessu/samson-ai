import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { Header } from '@/src/components/Header';
import { getSession } from '../../lib/auth';

export const Route = createFileRoute('/_onboarding')({
  beforeLoad: async () => {
    const { data: session } = await getSession();
    if (!session) return redirect({ to: '/signup' });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <div className="flex flex-row h-screen justify-center items-center">
        <Outlet />
      </div>
    </>
  );
}
