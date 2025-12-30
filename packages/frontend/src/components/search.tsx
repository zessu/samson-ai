import React, { useState } from 'react';

type SearchProps = {
  onSearch: (query: string) => void;
  isLoading?: boolean;
};

type SearchState = {
  query: string;
};

export const AISearchBar: React.FC<SearchProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const [state, setState] = useState<SearchState>({ query: '' });

  const handleSend = () => {
    if (state.query.trim()) {
      onSearch(state.query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setState({ query: '' });
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 p-2 bg-base-200 border border-base-300 rounded-sm shadow-sm focus-within:border-primary transition-all w-full">
        <input
          type="text"
          placeholder="Ask Samson Anything ..."
          className="input bg-transparent border-none focus:outline-none focus:ring-0 grow px-4"
          value={state.query}
          onChange={(e) => setState({ query: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={handleSend}
          disabled={isLoading || !state.query.trim()}
          className="btn btn-primary btn-circle btn-sm md:btn-md"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
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
        </button>
      </div>

      <p className="mt-2 text-xs text-center text-base-content/50">
        AI-generated content may be inaccurate.
      </p>
    </div>
  );
};

export default AISearchBar;
