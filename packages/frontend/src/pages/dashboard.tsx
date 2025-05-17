import { useState, type FC } from "react";
import { useSession } from "@/src/lib/auth";
import { useWebSocket } from "@/src/lib/useWebSocket";

export const Dashboard: FC = () => {
  const [doneGenerating, setDoneGenerating] = useState<boolean>(false);
  const { data: session } = useSession();
  const userid = session?.user.id;

  const markCompleted = () => {
    console.log("this has been called");
    setDoneGenerating(true);
  };

  useWebSocket(userid, markCompleted);

  return (
    <>
      {!doneGenerating && (
        <>
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-primary animate-ping"></div>
            <div className="status status-primary"></div>
          </div>{" "}
          Generating your workout. I will notifiy you when I am done
        </>
      )}
      {doneGenerating && (
        <div>
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
        </div>
      )}
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
