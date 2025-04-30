import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/gender-select")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const goToNextPage = () => {
    navigate({ to: "/age-select" });
  };

  return (
    <div>
      <div className="text-xl flex flex-col">
        <h3 className="font-bold text-lg mb-4">Lets begin by creating your profile</h3>
        <div className="mb-8">
          <span className="mr-4">
            <input type="radio" name="radio-1" className="radio" value="Male" />
            <span className="ml-2">Male</span>
          </span>
          <span className="mr-4">
            <input type="radio" name="radio-1" className="radio" value="Female" />
            <span className="ml-2">Female</span>
          </span>
        </div>
      </div>
      <button className="btn btn-primary" onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
}
