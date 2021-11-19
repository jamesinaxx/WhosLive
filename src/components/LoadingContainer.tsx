import type { FunctionComponent } from 'react';
import { css, keyframes } from '@emotion/react';
import { motion } from 'framer-motion';

export const LoadingAnim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer: FunctionComponent = ({ children }) => (
  <motion.div
    initial="start"
    animate="end"
    variants={{
      start: {
        transition: {
          staggerChildren: 0.2,
        },
      },
      end: {
        transition: {
          staggerChildren: 0.2,
        },
      },
    }}
    css={css`
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100%;
      width: 100%;
    `}
  >
    {children}
  </motion.div>
);
