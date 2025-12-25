import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useStore } from "../../state/onboarding";

export const Route = createFileRoute("/_onboarding/day-time")({
  component: RouteComponent,
});

const dayTimeSchema = z.object({
  Monday: z.union([z.literal("monday"), z.boolean()]),
  Tuesday: z.union([z.literal("tuesday"), z.boolean()]),
  Wednesday: z.union([z.literal("wednesday"), z.boolean()]),
  Thursday: z.union([z.literal("thursday"), z.boolean()]),
  Friday: z.union([z.literal("friday"), z.boolean()]),
  Saturday: z.union([z.literal("saturday"), z.boolean()]),
  Sunday: z.union([z.literal("sunday"), z.boolean()]),
});

type daysOfWeekInput = z.infer<typeof dayTimeSchema>;

type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

function RouteComponent() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<daysOfWeekInput>({
    resolver: zodResolver(dayTimeSchema),
  });

  const goToNextPage = () => {
    navigate({ to: "/time-selector" });
  };

  const onSubmit: SubmitHandler<daysOfWeekInput> = (data) => {
    const weekdays = Object.values(data).filter(
      (value): value is Weekday => value !== false
    );
    useStore.setState({ weekdays });
    goToNextPage();
  };

  return (
    <div>
      <h3 className="font-bold text-lg mb-2">
        What Days of the week do you want to work out ?
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("Monday")}
            value="monday"
            className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Monday</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("Tuesday")}
            value="tuesday"
            className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Tuesday</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("Wednesday")}
            value="wednesday"
            className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Wednesday</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("Thursday")}
            value="thursday"
            className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Thursday</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("Friday")}
            value="friday"
            className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Friday</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("Saturday")}
            value="saturday"
            className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Saturday</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            {...register("Sunday")}
            value="sunday"
            className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Sunday</span>
        </div>
        <button className="btn btn-primary" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
