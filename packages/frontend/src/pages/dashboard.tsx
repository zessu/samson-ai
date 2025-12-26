import { useState, type FC } from 'react';
import { useSession } from '@/src/lib/auth';
import { useWebSocket } from '@/src/lib/useWebSocket';
import { useLocalStorage } from '@/src/lib/useLocalStorage';
import { AISearchBar } from '@/src/components/search';

export const Dashboard: FC = () => {
  const [isLoading] = useState(false);
  const [doneGenerating, setDoneGenerating] = useState<boolean>(false);
  const [generatedWorkout, setGeneratedWorkout] =
    useLocalStorage('generatedWorkout');
  const { data: session } = useSession();
  const userid = session?.user.id;

  const markCompleted = () => {
    setGeneratedWorkout(true);
    setDoneGenerating(true);
  };

  useWebSocket(userid, markCompleted);

  const search = (_input: string) => console.log('you tried to search');

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        {!generatedWorkout && !doneGenerating && (
          <div className="flex flex-row items-center gap-2">
            <div className="inline-grid *:[grid-area:1/1]">
              <div className="status status-primary animate-ping"></div>
              <div className="status status-primary"></div>
            </div>
            Configuring your profile and generating some workouts for you.
          </div>
        )}
      </div>
      <div className="p-6 pb-8">
        <AISearchBar isLoading={isLoading} onSearch={() => search('')} />
      </div>
    </div>
  );
};
