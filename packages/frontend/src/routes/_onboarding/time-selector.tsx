import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { z } from "zod";
import { onBoardingSchema } from "shared";

import { useStore } from "../../state/onboarding";

export const Route = createFileRoute("/_onboarding/time-selector")({
  component: RouteComponent,
});

const workOutSchema = onBoardingSchema.pick({ time: true, duration: true });
type timeSelectorInputs = z.infer<typeof workOutSchema>;

function RouteComponent() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<timeSelectorInputs>({ resolver: zodResolver(workOutSchema) });

  const goToNextPage = () => {
    navigate({ to: "/notifications" });
  };

  const onSubmit: SubmitHandler<timeSelectorInputs> = (data) => {
    useStore.setState(data);
    dayjs.extend(utc);
    const utcOffset = dayjs().format("Z");
    const time = parseInt(utcOffset.split(":")[0]);
    useStore.setState(() => ({ offset: time }));
    goToNextPage();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="mb-2">What time do you want to work out?</p>
        <input
          type="time"
          className="input mb-4"
          {...register("time", {
            required: "Please select a workout time",
          })}
        />
        {errors.time && (
          <span className="text-red-500 text-sm block mb-2">
            {errors.time.message}
          </span>
        )}

        <p className="mb-2">
          For how long? (in minutes, e.g., 120 mins = 2 hrs)
        </p>
        <input
          type="number"
          className={`input mb-2`}
          required
          placeholder="How long do you want to work out for?"
          min={15}
          max={120}
          title="Duration might not be reasonable."
          {...register("duration", {
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
        {errors.duration && (
          <span className="text-red-500 text-sm block mb-2">
            {errors.duration.message}
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
