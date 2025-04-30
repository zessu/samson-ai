import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";

export const Route = createFileRoute("/day-time")({
  component: RouteComponent,
});

type daysOfWeekInput = {
  monday?: "Monday";
  tuesday?: "Tuesday";
  wednesday?: "Wednesday";
  thursday?: "Thursday";
  friday?: "Friday";
  saturday?: "Saturday";
  sunday?: "Sunday";
};

function RouteComponent() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<daysOfWeekInput>();

  const goToNextPage = () => {
    navigate({ to: "/time-selector" });
  };

  const onSubmit: SubmitHandler<daysOfWeekInput> = (data) => {
    console.log(data);
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
            {...register("monday")}
            value="Monday"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Monday</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("tuesday")}
            value="Tuesday"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Tuesday</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("wednesday")}
            value="Wednesday"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Wednesday</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("thursday")}
            value="Thursday"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Thursday</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("friday")}
            value="Friday"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Friday</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            {...register("saturday")}
            value="Saturday"
            className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span>Saturday</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            {...register("sunday")}
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
