import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/strength-equipment')({
  component: RouteComponent,
})

function RouteComponent() {
  const goToNextPage = () => { };

  return (
    <div>
      <div className="flex flex-col gap-3 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-2">What equipment in this list do you have?</h3>

        {/* Free Weights */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Dumbbells</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Barbells</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Kettlebells</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Weight Plates</span>
        </div>

        {/* Bars */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Pull Up Bar</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Long Bar</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Heavy Bar</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Deadlift Bar</span>
        </div>

        {/* Machines */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Leg Press Machine</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Lat Pulldown Machine</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Chest Press Machine</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Shoulder Press Machine</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Seated Row Machine</span>
        </div>

        {/* Accessories */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Weight Belt</span>
        </div>
      </div>
      <button className="btn btn-primary" onClick={goToNextPage}>
        Continue
      </button>


    </div>);
}
