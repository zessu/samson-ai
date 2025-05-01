import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { useStore, onBoardingSchema } from "../state/onboarding";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const Route = createFileRoute("/fitness-select")({
  component: RouteComponent,
});

const levelSchema = onBoardingSchema.pick({ fitnessLevel: true });
type fitnessLevelInput = z.infer<typeof levelSchema>;

function RouteComponent() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<fitnessLevelInput>({
    resolver: zodResolver(levelSchema),
  });

  const onSubmit: SubmitHandler<fitnessLevelInput> = (data) => {
    useStore.setState(data);
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
          defaultValue="beginner"
          className="select mb-4"
          {...register("fitnessLevel", { required: true })}
        >
          <option disabled={true}>What's your experience level ?</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        {errors.fitnessLevel && (
          <p role="alert" className="mb-2">
            {errors.fitnessLevel.message}
          </p>
        )}
        <button className="btn btn-primary" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
