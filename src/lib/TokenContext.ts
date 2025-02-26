import { createContext } from "react";

interface TokenContextProps {
  tokenValid: boolean;
  setTokenValid: (tokenValid: boolean) => void;
}

const TokenContext = createContext<TokenContextProps>({
  tokenValid: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTokenValid() {},
});

export default TokenContext;
