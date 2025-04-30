import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";

export const Route = createFileRoute("/time-selector")({
  component: RouteComponent,
});

type TimeSelectorInputs = {
  workoutTime: string;
  workoutDuration: number;
};

function RouteComponent() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TimeSelectorInputs>();

  const goToNextPage = (data: TimeSelectorInputs) => {
    console.log(data); // You can process the time and duration here
    navigate({ to: "/notifications" });
  };

  const onSubmit: SubmitHandler<TimeSelectorInputs> = (data) => {
    goToNextPage(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="mb-2">What time do you want to work out?</p>
        <input
          type="time"
          className="input mb-4"
          {...register("workoutTime", {
            required: "Please select a workout time",
          })}
        />
        {errors.workoutTime && (
          <span className="text-red-500 text-sm block mb-2">
            {errors.workoutTime.message}
          </span>
        )}

        <p className="mb-2">
          For how long? (in minutes, e.g., 120 mins = 2 hrs)
        </p>
        <input
          type="number"
          className={`input ${errors.workoutDuration ? "border-red-500" : ""} mb-2`}
          required
          placeholder="How long do you want to work out for?"
          min={15}
          max={120}
          title="Duration might not be reasonable."
          {...register("workoutDuration", {
            required: "Please enter the workout duration",
            min: {
              value: 15,
              message: "Workout duration must be at least 15 minutes",
            },
            max: {
              value: 120,
              message: "Workout duration cannot exceed 120 minutes",
            },
            valueAsNumber: true,
          })}
        />
        {errors.workoutDuration && (
          <span className="text-red-500 text-sm block mb-2">
            {errors.workoutDuration.message}
          </span>
        )}
        <p className="validator-hint mb-4">Between 15 and 120 mins</p>

        <button className="btn btn-primary" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
