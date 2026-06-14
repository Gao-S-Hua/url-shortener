import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import type { SharedUrlState } from '../types';

interface UrlContextValue {
  state: SharedUrlState;
  refreshCounter: number;
  setOriginalUrl: (url: string) => void;
  setShortUrl: (url: string) => void;
  refreshList: () => void;
  reset: () => void;
}

const initialState: SharedUrlState = {
  originalUrl: '',
  shortUrl: '',
};

const UrlContext = createContext<UrlContextValue | null>(null);

export function UrlProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SharedUrlState>(initialState);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const setOriginalUrl = (url: string) => {
    setState((prev) => ({ ...prev, originalUrl: url }));
  };

  const setShortUrl = (url: string) => {
    setState((prev) => ({ ...prev, shortUrl: url }));
  };

  const refreshList = () => {
    setRefreshCounter((c) => c + 1);
  };

  const reset = () => {
    setState(initialState);
  };

  return (
    <UrlContext.Provider
      value={{
        state,
        refreshCounter,
        setOriginalUrl,
        setShortUrl,
        refreshList,
        reset,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
}

export function useUrlContext(): UrlContextValue {
  const ctx = useContext(UrlContext);
  if (!ctx) {
    throw new Error('useUrlContext must be used within a UrlProvider');
  }
  return ctx;
}
