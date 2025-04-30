import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";

export const Route = createFileRoute("/goals")({
  component: RouteComponent,
});

type goalInputs = {
  weight: string;
  muscle: string;
  tone: string;
  cardio: string;
  endurance: string;
  flexibility: string;
  posture: string;
  stress: string;
  maintain: string;
  sport: string;
  rehabilitate: string;
};

function RouteComponent() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<goalInputs>();

  const onSubmit: SubmitHandler<goalInputs> = (data) => {
    console.log(data);
    goToNextPage();
  };

  const goToNextPage = () => {
    navigate({ to: "/cardio-equipment" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 p-4">
          <h3 className="font-bold text-lg mb-2">Select Your Fitness Goals</h3>

          {/* Weight & Body Composition */}
          <div className="flex items-center gap-2">
            <input
              {...register("weight", { required: false })}
              type="checkbox"
              value="lose weight"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Lose Weight</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("muscle", { required: false })}
              type="checkbox"
              value="add muscle"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Add Muscle / Build Strength</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("tone", { required: false })}
              type="checkbox"
              value="tone my body"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Tone Muscles (Lean & Defined)</span>
          </div>

          {/* Performance & Endurance */}
          <div className="flex items-center gap-2">
            <input
              {...register("cardio", { required: false })}
              type="checkbox"
              value="increase cardiovascular fitness"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Improve Cardio (Running, Cycling, etc.)</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("endurance", { required: false })}
              type="checkbox"
              value="increase endurance and stamina"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Increase Endurance & Stamina</span>
          </div>

          {/* Mobility & Functional Fitness */}
          <div className="flex items-center gap-2">
            <input
              {...register("flexibility", { required: false })}
              type="checkbox"
              value="improve flexibility and mobility"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Improve Flexibility & Mobility</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("posture", { required: false })}
              type="checkbox"
              value="fix posture and reduce back pain"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Fix Posture / Reduce Back Pain</span>
          </div>

          {/* Lifestyle & Mental Health */}
          <div className="flex items-center gap-2">
            <input
              {...register("stress", { required: false })}
              type="checkbox"
              value="stress relief and mental wellness"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Stress Relief & Mental Wellness</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("maintain", { required: false })}
              type="checkbox"
              value="maintain fitness as I age"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Maintain Fitness as I Age</span>
          </div>

          {/* Specialized Goals */}
          <div className="flex items-center gap-2">
            <input
              {...register("sport", { required: false })}
              type="checkbox"
              value="train for a sport"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Train for a Sport (Basketball, Soccer, etc.)</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("rehabilitate", { required: false })}
              value="rehabilitate an injury"
              type="checkbox"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Rehabilitate an Injury</span>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
