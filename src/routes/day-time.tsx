import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/day-time')({
  component: RouteComponent,
})

function RouteComponent() {
  const goToNextPage = () => { }

  return (
    <div>
      <h3 className="font-bold text-lg mb-2">What Days of the week do you want to work out ?</h3>
      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
        />
        <span>Monday</span>
      </div>


      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
        />
        <span>Tuesday</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
        />
        <span>Wednesday</span>
      </div>


      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
        />
        <span>Thursday</span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
        />
        <span>Friday</span>
      </div>


      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
        />
        <span>Saturday</span>
      </div>


      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
        />
        <span>Sunday</span>
      </div>
      <button className="btn btn-primary" onClick={goToNextPage}>
        Continue
      </button>
    </div>
  );
}
