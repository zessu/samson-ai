import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <input
          type="text"
          name="email"
          placeholder="Emal"
          className="input mb-3"
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          className="input mb-3"
        />
        <div className="flex flex-row">
          <button className="btn btn-soft btn-primary">Log In</button>
          <button className="btn btn-link btn-primary">Or Register</button>
        </div>
        <label className="fieldset-label mt-5">
          <input type="checkbox" className="checkbox" />
          Remember me
        </label>
      </div>
    </>
  );
}
