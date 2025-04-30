import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/goals')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate({ to: "/cardio-equipment" });
  }

  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        <h3 className="font-bold text-lg mb-2">Select Your Fitness Goals</h3>

        {/* Weight & Body Composition */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Lose Weight</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Add Muscle / Build Strength</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Tone Muscles (Lean & Defined)</span>
        </div>

        {/* Performance & Endurance */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Improve Cardio (Running, Cycling, etc.)</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Increase Endurance & Stamina</span>
        </div>

        {/* Mobility & Functional Fitness */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Improve Flexibility & Mobility</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Fix Posture / Reduce Back Pain</span>
        </div>

        {/* Lifestyle & Mental Health */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Stress Relief & Mental Wellness</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Maintain Fitness as I Age</span>
        </div>

        {/* Specialized Goals */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Train for a Sport (Basketball, Soccer, etc.)</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Rehabilitate an Injury</span>
        </div>
      </div>
      <button className="btn btn-primary" onClick={goToNextPage}>
        Continue
      </button>
    </div>
  );
}
