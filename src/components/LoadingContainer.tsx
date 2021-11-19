import type { FunctionComponent } from 'react';
import { css, keyframes } from '@emotion/react';

export const LoadingAnim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer: FunctionComponent = ({ children }) => (
  <div
    css={css`
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      div {
        animation: ${LoadingAnim} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;
        &:after {
          content: ' ';
          display: block;
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          margin: -4px 0 0 -4px;
        }
      }
    `}
  >
    {children}
  </div>
);
