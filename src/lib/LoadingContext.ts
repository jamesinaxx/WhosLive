import { createContext } from 'react';

interface LoadingContextProps {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps>({
  isLoading: true,
  setLoading: () => {},
});

export default LoadingContext;
