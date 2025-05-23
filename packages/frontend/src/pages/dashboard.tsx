import { useState, type FC } from "react";
import { useSession } from "@/src/lib/auth";
import { useWebSocket } from "@/src/lib/useWebSocket";
import { useLocalStorage } from "@/src/lib/useLocalStorage";

export const Dashboard: FC = () => {
  const [doneGenerating, setDoneGenerating] = useState<boolean>(false);
  const [generatedWorkout, setGeneratedWorkout] =
    useLocalStorage("generatedWorkout");
  const { data: session } = useSession();
  const userid = session?.user.id;

  const markCompleted = () => {
    setGeneratedWorkout(true);
    setDoneGenerating(true);
  };

  useWebSocket(userid, markCompleted);

  return (
    <>
      {!generatedWorkout && !doneGenerating && (
        <>
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-primary animate-ping"></div>
            <div className="status status-primary"></div>
          </div>{" "}
          Configuring your profile and generating some workouts for you.
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
      <div className="flex flex-col justify-center items-center w-full">
        <img src="/wip.png" width="300" height="300" className="w-80 h-80" />
        <p className="font-bold text-xs w-80 ">
          The dashboard is still a work in progress. You will still get emails
          and notifications in your mailbox an hour to your workout. I'll send
          you an example workout email so you know what to expect. Once the
          dashboard is ready, I will notify you via email. You'll be able to
          login, chat to me and view your metrics
        </p>
      </div>
    </>
  );
};
