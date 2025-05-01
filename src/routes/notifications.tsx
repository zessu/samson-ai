import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStore } from "../state/onboarding";

export const Route = createFileRoute("/notifications")({
  component: RouteComponent,
});

type notificationInputs = {
  email: boolean;
  app: boolean;
  sms: boolean;
};

function RouteComponent() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<notificationInputs>({
    defaultValues: {
      email: true,
      app: false,
      sms: false,
    },
  });

  const finish: SubmitHandler<notificationInputs> = (data) => {
    useStore.setState({ notifications: data });
    navigate({ to: "/" });
  };

  return (
    <div className="text-xl flex flex-col">
      <h3 className="font-bold text-lg mb-2">
        What's the best way to reach you with your daily workouts?
      </h3>
      <form onSubmit={handleSubmit(finish)} className="mb-10 flex flex-col">
        <span className="mb-4">
          <input
            type="checkbox"
            className="checkbox"
            value="email"
            {...register("email")}
          />
          <span className="ml-2">Email</span>
        </span>

        <span className="mb-4">
          <input
            type="checkbox"
            className="checkbox"
            value="app"
            disabled
            {...register("app")}
          />
          <span className="ml-2">In App (Work In Progress)</span>
        </span>

        <span className="mb-4">
          <input
            type="checkbox"
            className="checkbox"
            value="sms"
            disabled
            {...register("sms")}
          />
          <span className="ml-2">Via SMS (Work In Progress)</span>
        </span>

        <button className="btn btn-accent" type="submit">
          Start My Journey
        </button>
      </form>
    </div>
  );
}
