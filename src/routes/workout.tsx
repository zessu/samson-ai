import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workout")({
  component: DailyWorkout,
});

function DailyWorkout() {
  return <div className="p-2">Your workouts for today</div>;
}
