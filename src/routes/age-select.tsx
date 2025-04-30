import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/age-select')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate({ to: "/weight-select" })
  }

  return (
    <div className="w-64">
      <div>
        <input
          type="number"
          className="input validator"
          required
          placeholder="How old are you ?"
          min="10"
          max="100"
          title="Select correct age"
        />
        <p className="validator-hint mb-4">That does not seem right!</p>
      </div>
      <button className="btn btn-primary" onClick={goToNextPage}>
        Continue
      </button>
    </div>

  );
}
