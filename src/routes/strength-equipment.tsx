import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";

export const Route = createFileRoute("/strength-equipment")({
  component: RouteComponent,
});

type StrengthEquipmentInputs = {
  dumbbells: string;
  barbells: string;
  kettlebells: string;
  weightPlates: string;
  pullUpBar: string;
  longBar: string;
  heavyBar: string;
  deadliftBar: string;
  legPressMachine: string;
  latPulldownMachine: string;
  chestPressMachine: string;
  shoulderPressMachine: string;
  seatedRowMachine: string;
  weightBelt: string;
};

function RouteComponent() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<StrengthEquipmentInputs>();

  const onSubmit: SubmitHandler<StrengthEquipmentInputs> = (data) => {
    console.log(data);
    goToNextPage();
  };

  const goToNextPage = () => {
    navigate({ to: "/day-time" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">
            What equipment in this list do you have?
          </h3>

          {/* Free Weights */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("dumbbells", { required: false })}
              value="Dumbbells"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Dumbbells</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("barbells", { required: false })}
              value="Barbells"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Barbells</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("kettlebells", { required: false })}
              value="Kettlebells"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Kettlebells</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("weightPlates", { required: false })}
              value="Weight Plates"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Weight Plates</span>
          </div>

          {/* Bars */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("pullUpBar", { required: false })}
              value="Pull Up Bar"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Pull Up Bar</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("longBar", { required: false })}
              value="Long Bar"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Long Bar</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("heavyBar", { required: false })}
              value="Heavy Bar"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Heavy Bar</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("deadliftBar", { required: false })}
              value="Deadlift Bar"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Deadlift Bar</span>
          </div>

          {/* Machines */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("legPressMachine", { required: false })}
              value="Leg Press Machine"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Leg Press Machine</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("latPulldownMachine", { required: false })}
              value="Lat Pulldown Machine"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Lat Pulldown Machine</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("chestPressMachine", { required: false })}
              value="Chest Press Machine"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Chest Press Machine</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("shoulderPressMachine", { required: false })}
              value="Shoulder Press Machine"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Shoulder Press Machine</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("seatedRowMachine", { required: false })}
              value="Seated Row Machine"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Seated Row Machine</span>
          </div>

          {/* Accessories */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("weightBelt", { required: false })}
              value="Weight Belt"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Weight Belt</span>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
