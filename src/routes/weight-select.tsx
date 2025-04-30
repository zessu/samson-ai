import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/weight-select')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const goToNextPage = () => {
    navigate({ to: "/fitness-select" });
  }
  return (
    <div>
      <div className="w-64">
        <input
          type="number"
          className="input validator"
          required
          placeholder="How many KGs do you weigh?"
          min="40"
          max="150"
          title="Select correct age"
        />
        <p className="validator-hint">That does not seem right!</p>
      </div>
      <button className="btn btn-primary" onClick={goToNextPage}>
        Continue
      </button>
    </div>
  );
}
