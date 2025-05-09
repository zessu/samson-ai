import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { useStore } from "../../state/onboarding";
import { onBoardingSchema } from "shared";

import { zodResolver } from "@hookform/resolvers/zod";

const genderSchema = onBoardingSchema.pick({ gender: true });
type GenderFormValues = z.infer<typeof genderSchema>;

export const Route = createFileRoute("/_onboarding/gender-select")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<GenderFormValues>({
    resolver: zodResolver(genderSchema),
  });

  const onSubmit: SubmitHandler<GenderFormValues> = (data) => {
    try {
      useStore.setState(data);
      goToNextPage();
    } catch (error) {
      console.log(error);
    }
  };

  const goToNextPage = () => {
    navigate({ to: "/age-select" });
  };
  return (
    <div>
      <div className="text-xl flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg mb-4">
            Lets begin by creating your profile
          </h3>
          <div className="mb-8">
            <span className="mr-4">
              <input
                type="radio"
                className="radio"
                value="Male"
                {...register("gender", { required: true })}
              />
              <span className="ml-2">Male</span>
            </span>
            <span className="mr-4">
              <input
                type="radio"
                className="radio"
                value="Female"
                {...register("gender", { required: true })}
              />
              <span className="ml-2">Female</span>
            </span>
          </div>
          <button className="btn btn-primary" type="submit">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
