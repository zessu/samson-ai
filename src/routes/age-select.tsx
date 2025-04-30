import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";

export const Route = createFileRoute("/age-select")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<{ age: number }>();
  const onSubmit: SubmitHandler<{ age: number }> = (data) => {
    console.log(data);
    goToNextPage();
  };
  const goToNextPage = () => {
    navigate({ to: "/weight-select" });
  };

  return (
    <div className="w-64">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="number"
            className="input validator"
            required
            placeholder="How old are you ?"
            min="10"
            max="100"
            title="Select correct age"
            {...register("age", { required: true, min: 10, max: 100 })}
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
