import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { onBoardingSchema, onBoardingState } from "shared";

import { useStore } from "../../state/onboarding";

export const Route = createFileRoute("/_onboarding/notifications")({
  component: RouteComponent,
});

type notificationInputs = {
  email: boolean;
  app: boolean;
  sms: boolean;
};

function RouteComponent() {
  const [onBoardingError, setonBoardingError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<notificationInputs>({
    defaultValues: {
      email: true,
      app: false,
      sms: false,
    },
  });

  const submitForm = async (data: onBoardingState) => {
    return await fetch(`/api/createProfile`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  };

  const finish: SubmitHandler<notificationInputs> = async (data) => {
    useStore.setState({ notifications: data });
    const userSettings = useStore.getState();
    try {
      const validated = await onBoardingSchema.parse(userSettings);
      setIsLoading(true);
      const res = await submitForm(validated);
      if (res.ok) {
        navigate({ to: "/" });
      } else {
        if (!res.ok) setonBoardingError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-xl flex flex-col">
      {onBoardingError && (
        <div role="alert" className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            There was a problem processing your request. Give it a minute and
            try again
          </span>
        </div>
      )}

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
          {isLoading ? "Submitting your details ..." : "Start My Journey"}
        </button>
      </form>
    </div>
  );
}
