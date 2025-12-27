import { useState, type FC } from 'react';

import { useSession } from '@/src/lib/auth';
import { useWebSocket } from '@/src/lib/useWebSocket';
import { AISearchBar } from '@/src/components/search';

export const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const userid = session?.user.id;

  const markCompleted = () => console.log('');

  useWebSocket(userid, markCompleted);

  const search = async (_input: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        body: JSON.stringify(_input),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error); //TODO: show error in more meaningful way
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col justify-center items-center w-full"></div>
      <div className="p-6 pb-16">
        <AISearchBar isLoading={isLoading} onSearch={() => search('')} />
      </div>
    </div>
  );
};
