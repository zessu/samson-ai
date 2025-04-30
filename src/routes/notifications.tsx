import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/notifications')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const finish = () => {
    navigate({ to: "/" })
  }
  return (
    <div className="text-xl flex flex-col">
      <h3 className="font-bold text-lg mb-2">What's the best way to send you your workouts?</h3>
      <div className="mb-10 flex flex-col">
        <span className="mb-4">
          <input type="checkbox" defaultChecked className="checkbox" value="email" />
          <span className="ml-2">Email</span>
        </span>

        <span className="mb-4">
          <input type="checkbox" disabled className="checkbox" value="app" />
          <span className="ml-2">In App (WIP)</span>
        </span>

        <span className="mb-4">
          <input type="checkbox" disabled className="checkbox" value="sms" />
          <span className="ml-2">Via SMS (WIP)</span>
        </span>

      </div>
      <button className="btn btn-primary" onClick={finish}>
        Start My Journey
      </button>
    </div>
  );
}
