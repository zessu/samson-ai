import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/time-selector')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const goToNextPage = () => {
    navigate({ to: "/notifications" })
  }
  return (
    <div>
      <p className="mb-2">What time do you want to work out?</p>
      <input type="time" className="input mb-4" />

      <p className="mb-2">For how long? in mins e.g 120mins = 2hrs</p>
      <input
        type="number"
        className="input validator"
        required
        placeholder="How long do you want to work out for?"
        min="15"
        max="120"
        title="Duration might not be reasonable."
      />
      <p className="validator-hint mb-4">Btn 15 and 120 mins</p>

      <button className="btn btn-primary" onClick={goToNextPage}>
        Continue
      </button>
    </div>

  );
}
