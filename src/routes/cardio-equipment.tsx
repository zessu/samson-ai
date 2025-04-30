import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";

export const Route = createFileRoute("/cardio-equipment")({
  component: RouteComponent,
});

type cardioEquipmentInputs = {
  treadmill: string;
  runningTrack: string;
  ellipticalTrainer: string;
  stationaryBike: string;
  rowingMachine: string;
  resistanceBands: string;
  exerciseMats: string;
  stabilityBalls: string;
  foamRollers: string;
  skippingRopes: string;
  boxingBagAndGloves: string;
  medicineBalls: string;
};

function RouteComponent() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<cardioEquipmentInputs>();

  const onSubmit: SubmitHandler<cardioEquipmentInputs> = (data) => {
    console.log(data);
    goToNextPage();
  };

  const goToNextPage = () => {
    navigate({ to: "/strength-equipment" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">
            What equipment in this list do you own ?
          </h3>

          {/* Cardio Machines */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("treadmill", { required: false })}
              value="Treadmill"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Treadmill</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("runningTrack", { required: false })}
              value="Access to a running track"
              type="checkbox"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Access to a running track</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("ellipticalTrainer", { required: false })}
              value="Elliptical Trainer"
              type="checkbox"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Elliptical Trainer</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("stationaryBike", { required: false })}
              value="Stationary Bike"
              type="checkbox"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Stationary Bike</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("rowingMachine", { required: false })}
              value="Rowing Machine"
              type="checkbox"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Rowing Machine</span>
          </div>

          {/* Small Equipment */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("resistanceBands", { required: false })}
              value="Resistance Bands"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Resistance Bands</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("exerciseMats", { required: false })}
              value="Exercise Mats"
              type="checkbox"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Exercise Mats</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("stabilityBalls", { required: false })}
              value="Stability Balls"
              type="checkbox"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Stability Balls</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("foamRollers", { required: false })}
              value="Foam Rollers"
              type="checkbox"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Foam Rollers</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("skippingRopes", { required: false })}
              value="Skipping Ropes / Jump Ropes"
              type="checkbox"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Skipping Ropes / Jump Ropes</span>
          </div>

          {/* Strength & Specialty */}
          <div className="flex items-center gap-2">
            <input
              {...register("boxingBagAndGloves", { required: false })}
              value="Boxing Bag & Gloves"
              type="checkbox"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Boxing Bag & Gloves</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("medicineBalls", { required: false })}
              value="Medicine Balls / Slam Balls"
              type="checkbox"
              className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Medicine Balls / Slam Balls</span>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Next List
        </button>
      </form>
    </div>
  );
}
