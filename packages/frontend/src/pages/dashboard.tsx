import { useState, useRef, type FC } from 'react';

import { useSession } from '@/src/lib/auth';
import { samson as agent } from '@/src/lib/mastra-client';
import { useWebSocket } from '@/src/lib/useWebSocket';
import { AISearchBar } from '@/src/components/search';

type Message = {
  role: 'user' | 'agent';
  content: string;
};

export const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const userid = session?.user.id;
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const responseRef = useRef('');

  const markCompleted = () => console.log('');

  useWebSocket(userid, markCompleted);

  const search = async (_input: string) => {
    setIsLoading(true);
    setCurrentResponse('');
    responseRef.current = '';

    const newUserMessage: Message = { role: 'user', content: _input };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const stream = await agent.stream({
        messages: [
          {
            role: 'user',
            content: _input,
          },
        ],
      });

      stream
        .processDataStream({
          onChunk: async (chunk) => {
            if (chunk.type === 'text-delta') {
              responseRef.current += chunk.payload.text;
              setCurrentResponse(responseRef.current);
            }
          },
        })
        .finally(() => {
          setMessages((prev) => [
            ...prev,
            { role: 'agent', content: responseRef.current },
          ]);
          setCurrentResponse('');
          setIsLoading(false);
        });
    } catch (error) {
      console.log(`an error occurred while generating reponses ${error}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-base-100">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.length === 0 && !currentResponse && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-4">
              <img
                src="/samson.png"
                alt="Samson"
                className="w-32 h-32 rounded-full shadow-lg"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to Samson</h2>
            <p className="text-base-content/60 max-w-md">
              Your AI fitness assistant is ready to help you achieve your goals.
              Ask me anything about workouts, nutrition, or training.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-content'
                  : 'bg-base-200 text-base-content'
              }`}
            >
              <p className="whitespace-pre-wrap wra-break-word leading-relaxed">
                {message.content}
              </p>
            </div>
          </div>
        ))}

        {currentResponse && (
          <div className="flex justify-start">
            <div className="max-w-2xl rounded-2xl px-4 py-3 bg-base-200 text-base-content">
              <p className="whitespace-pre-wrap wrap-break-word leading-relaxed">
                {currentResponse}
                <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse" />
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 bg-base-100 border-t border-base-200">
        <AISearchBar isLoading={isLoading} onSearch={search} />
      </div>
    </div>
  );
};
