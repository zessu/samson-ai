import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workout")({
  component: DailyWorkout,
});

function DailyWorkout() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="bold">Your Workouts for today</h2>
        <div>
          <div className="card bg-base-100 image-full w-96 mb-5 shadow-sm rounded-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Upper Body</h2>
              <p>Working out these upper body exercises</p>
              <div className="card-actions justify-end">
                <button className="btn btn-outline btn-primary rounded-xl">
                  Start
                </button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 image-full w-96 mb-5 shadow-sm rounded-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Full body stretches</h2>
              <p>You need to stretch and relax your muscles</p>
              <div className="card-actions justify-end">
                <button className="btn btn-outline btn-primary rounded-xl">
                  Start
                </button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 image-full w-96 mb-5 shadow-sm rounded-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Strength Traning</h2>
              <p>Need to lift some weights so you can become strong</p>
              <div className="card-actions justify-end">
                <button className="btn btn-outline btn-primary rounded-xl">
                  Start
                </button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 image-full w-96 mb-5 shadow-sm rounded-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Back</h2>
              <p>Your core strength is important to your overall health</p>
              <div className="card-actions justify-end">
                <button className="btn btn-outline btn-primary rounded-xl">
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
