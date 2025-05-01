import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { useStore, onBoardingSchema } from "../state/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
export const Route = createFileRoute("/weight-select")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const weightSchema = onBoardingSchema.pick({ weight: true });
  type weightSchema = z.infer<typeof weightSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<weightSchema>({
    resolver: zodResolver(weightSchema),
  });

  const onSubmit: SubmitHandler<weightSchema> = (data) => {
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
              valueAsNumber: true,
            })}
          />
          <p className="validator-hint mb-2">That does not seem right!</p>
        </div>
        {errors.weight && (
          <p role="alert" className="mb-2">
            {errors.weight.message}
          </p>
        )}
        <button className="btn btn-primary" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
