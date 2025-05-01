import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStore } from "../state/onboarding";

export const Route = createFileRoute("/day-time")({
  component: RouteComponent,
});

const dayTimeSchema = z.object({
  Monday: z.union([z.literal("Monday"), z.boolean()]),
  Tuesday: z.union([z.literal("Tuesday"), z.boolean()]),
  Wednesday: z.union([z.literal("Wednesday"), z.boolean()]),
  Thursday: z.union([z.literal("Thursday"), z.boolean()]),
  Friday: z.union([z.literal("Friday"), z.boolean()]),
  Saturday: z.union([z.literal("Saturday"), z.boolean()]),
  Sunday: z.union([z.literal("Sunday"), z.boolean()]),
});

type daysOfWeekInput = z.infer<typeof dayTimeSchema>;

type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

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
            value="Monday"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Monday</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("Tuesday")}
            value="Tuesday"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Tuesday</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("Wednesday")}
            value="Wednesday"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Wednesday</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("Thursday")}
            value="Thursday"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Thursday</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("Friday")}
            value="Friday"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Friday</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("Saturday")}
            value="Saturday"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Saturday</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            {...register("Sunday")}
            value="Sunday"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
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
