import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/cardio-equipment')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const goToNextPage = () => {
    navigate({ to: "/strength-equipment" });
  }

  return (
    <div>
      <div className="flex flex-col gap-3 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-2">What equipment in this list do you own ?</h3>

        {/* Cardio Machines */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Treadmill</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Access to a running track</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Elliptical Trainer</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Stationary Bike</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Rowing Machine</span>
        </div>

        {/* Small Equipment */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Resistance Bands</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Exercise Mats</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Stability Balls</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Foam Rollers</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Skipping Ropes / Jump Ropes</span>
        </div>

        {/* Strength & Specialty */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Boxing Bag & Gloves</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Medicine Balls / Slam Balls</span>
        </div>
      </div>
      <button className="btn btn-primary" onClick={goToNextPage}>
        Next List
      </button>
    </div>
  );
}
