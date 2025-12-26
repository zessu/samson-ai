import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '../../pages/dashboard';

export const Route = createFileRoute('/_/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div>
        <Dashboard />
      </div>
    </>
  );
}
