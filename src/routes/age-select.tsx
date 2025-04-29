import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/age-select')({
  component: RouteComponent,
})

function RouteComponent() {
  const goToNextPage = () => { }
  return (
    <div>
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
        <p className="validator-hint">That does not seem right!</p>
      </div>
      <button className="btn btn-primary" onClick={goToNextPage}>
        Continue
      </button>
    </div>

  );
}
