import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gender-select")({
  component: RouteComponent,
});

function RouteComponent() {
  const goToNextPage = () => {
    console.log("go to the next page");
  };

  return (
    <div className="text-xl flex flex-col">
      <div className="mb-10">
        <span className="mr-4">
          <input type="radio" name="radio-1" className="radio" value="Male" />
          <span className="ml-2">Male</span>
        </span>
        <span className="mr-4">
          <input type="radio" name="radio-1" className="radio" value="Female" />
          <span className="ml-2">Female</span>
        </span>
      </div>
      <button className="btn btn-primary" onClick={goToNextPage}>
        Continue
      </button>
    </div>
  );
}
