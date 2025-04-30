import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";

type inputValues = {
  gender: "Male" | "Female";
};

export const Route = createFileRoute("/gender-select")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<inputValues>();
  const onSubmit: SubmitHandler<inputValues> = (data) => {
    console.log(data);
    goToNextPage();
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
