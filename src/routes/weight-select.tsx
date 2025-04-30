import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";

export const Route = createFileRoute("/weight-select")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<{ weight: number }>();

  const onSubmit: SubmitHandler<{ weight: number }> = (data) => {
    console.log(data);
    goToNextPage();
  };

  const goToNextPage = () => {
    navigate({ to: "/fitness-select" });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-64">
          <input
            type="number"
            className="input validator"
            required
            placeholder="How many KGs do you weigh?"
            min="40"
            max="150"
            title="Select correct age"
            {...register("weight", {
              required: true,
              min: 40,
              max: 150,
            })}
          />
          <p className="validator-hint mb-4">That does not seem right!</p>
        </div>
        <button className="btn btn-primary" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
