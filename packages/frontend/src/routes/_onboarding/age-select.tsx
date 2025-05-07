import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { onBoardingSchema, useStore } from "../../state/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const Route = createFileRoute("/_onboarding/age-select")({
  component: RouteComponent,
});

const ageSchema = onBoardingSchema.pick({ age: true });
type ageInputType = z.infer<typeof ageSchema>;

function RouteComponent() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ageInputType>({
    resolver: zodResolver(ageSchema),
  });
  const onSubmit: SubmitHandler<ageInputType> = (data) => {
    useStore.setState(data);
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
            {...register("age", {
              required: true,
              min: 10,
              max: 100,
              valueAsNumber: true,
            })}
          />
          <p className="validator-hint mb-2">That does not seem right!</p>
        </div>
        {errors.age && (
          <p role="alert" className="mb-2">
            {errors.age.message}
          </p>
        )}
        <button className="btn btn-primary" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
