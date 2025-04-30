import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";

export const Route = createFileRoute("/fitness-select")({
  component: RouteComponent,
});

type fitnessInput = {
  level: "beginner" | "intermediate" | "advanced";
};

function RouteComponent() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<fitnessInput>();

  const onSubmit: SubmitHandler<fitnessInput> = (data) => {
    console.log(data.level);
    goToNextPage();
  };

  const goToNextPage = () => {
    navigate({ to: "/goals" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="mb-2">What's your fitness level ?</p>
        <select
          defaultValue="Pick a color"
          className="select mb-4"
          {...(register("level"), { required: true })}
        >
          <option disabled={true}>What's your experience level ?</option>
          <option>Beginner</option>
          <option>Intermeddiate</option>
          <option>Advanced</option>
        </select>
        <button className="btn btn-primary" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
