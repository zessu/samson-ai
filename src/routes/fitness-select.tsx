import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/fitness-select')({
  component: RouteComponent,
})

function RouteComponent() {
  const goToNextPage = () => { }
  return (
    <div>
      <p className="mb-2">What's your fitness level ?</p>
      <select defaultValue="Pick a color" className="select mb-4">
        <option disabled={true}>What's your experience level ?</option>
        <option>Beginner</option>
        <option>Intermeddiate</option>
        <option>Advanced</option>
      </select>
      <button className="btn btn-primary" onClick={goToNextPage}>
        Continue
      </button>
    </div>
  );
}
