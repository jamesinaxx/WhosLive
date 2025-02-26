import { createContext } from "react";

interface LoadingContextProps {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps>({
  loading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoading() {},
});

export default LoadingContext;
