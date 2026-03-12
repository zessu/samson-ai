import { useState, type KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type SearchProps = {
  onSearch: (query: string) => void;
  isLoading?: boolean;
};

type SearchState = {
  query: string;
};

export const AISearchBar = ({ onSearch, isLoading = false }: SearchProps) => {
  const [state, setState] = useState<SearchState>({ query: '' });

  const handleSend = () => {
    if (state.query.trim()) {
      onSearch(state.query);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setState({ query: '' });
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 p-2 bg-muted border border-border rounded-md shadow-sm focus-within:border-primary transition-all w-full">
        <Input
          type="text"
          placeholder="Ask Samson Anything ..."
          className="bg-transparent border-none focus:outline-none focus:ring-0 grow px-4"
          value={state.query}
          onChange={(e) => setState({ query: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        <Button
          onClick={handleSend}
          disabled={isLoading}
          size="icon"
          className="rounded-full"
        >
          {isLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          )}
        </Button>
      </div>

      <p className="mt-2 text-xs text-center text-muted-foreground/50">
        AI-generated content may be inaccurate.
      </p>
    </div>
  );
};

export default AISearchBar;
