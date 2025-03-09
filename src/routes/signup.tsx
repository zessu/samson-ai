import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <input type="text" placeholder="Name" className="input mb-3" />
        <input type="text" placeholder="Email Address" className="input mb-3" />
        <input type="password" placeholder="Password" className="input mb-3" />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input mb-3"
        />
        <div>
          <button className="btn btn-soft btn-primary">Register</button>
          <button className="btn btn-link btn-primary">Or Login</button>
        </div>
      </div>
    </>
  );
}
