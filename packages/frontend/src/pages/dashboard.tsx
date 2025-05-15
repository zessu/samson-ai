import { useState, type FC } from "react";
// import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
export const Dashboard: FC = () => {
  // const [selected, setSelected] = useState<Date[] | undefined>();
  const [doneGenerating, setDoneGenerating] = useState<boolean>(false);
  return (
    <>
      <div className="inline-grid *:[grid-area:1/1]">
        <div className="status status-primary animate-ping"></div>
        <div className="status status-primary"></div>
      </div>{" "}
      {!doneGenerating && (
        <>Generating your workout. I will notifiy you when I am done</>
      )}
      {doneGenerating && (
        <div role="alert" className="alert alert-success mb-4">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Congratulations🥳🎉 You will get daily work-outs sent directly to
            your email every day an hour before your next workout
          </span>
        </div>
      )}
      {/* <div className="p-10 flex flex-row gap-5">
        <div>
          <DayPicker
            mode="multiple"
            selected={selected}
            onSelect={setSelected}
          ></DayPicker>
        </div>
        <div className="flex flex-row gap-5">
          <div className="card bg-base-100 image-full w-80 h-50 shadow-sm">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Daily Streak</h2>
              <p>Keep working out, you're doing great</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Just do it</button>
              </div>
            </div>
          </div>
          <div className="flex flex-row wrap gap-3">
            <div className="card bg-primary text-primary-content h-40 w-40 rounded-xl">
              <div className="card-body">
                <h2 className="card-title">Calories Burned 🔥</h2>
                <p>2,457</p>
              </div>
            </div>
            <div className="card bg-secondary text-primary-content h-40 w-40 rounded-xl">
              <div className="card-body">
                <h2 className="card-title">Steps Walked</h2>
                <p>You've taken 5,689 steps or walked 10KM </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="flex flex-row justify-center w-full">
        <img src="wip.png" className="w-80 h-80" />
      </div>
      <p>
        Working on the dashboard. You will still get emails and notifications in
        your mailbox an hour to your workout.
      </p>
      <p>
        We will send you a notification once you can log in here to track your
        workouts and view some metrics
      </p>
    </>
  );
};
