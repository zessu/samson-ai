import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

function Signup() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div>
          <button className="btn btn-soft btn-primary">Sign up/Login</button>
        </div>
      </div>
    </>
  );
}
