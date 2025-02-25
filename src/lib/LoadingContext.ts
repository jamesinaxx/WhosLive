import { createContext } from "react";

interface LoadingContextProps {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps>({
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoading() {},
});

export default LoadingContext;
