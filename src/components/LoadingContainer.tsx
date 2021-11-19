import type { FunctionComponent } from 'react';
import { css, keyframes } from '@emotion/react';
import { animationChild } from '../styleMixins';

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
        &:nth-child(1) {
          ${animationChild(-0.036, 63, 63)};
        }
        &:nth-child(2) {
          ${animationChild(-0.072, 68, 56)};
        }
        &:nth-child(3) {
          ${animationChild(-0.108, 71, 48)};
        }
        &:nth-child(4) {
          ${animationChild(-0.144, 72, 40)};
        }
        &:nth-child(5) {
          ${animationChild(-0.18, 71, 32)};
        }
        &:nth-child(6) {
          ${animationChild(-0.216, 68, 24)};
        }
        &:nth-child(7) {
          ${animationChild(-0.252, 63, 17)};
        }
        &:nth-child(8) {
          ${animationChild(-0.288, 56, 12)};
        }
      }
    `}
  >
    {children}
  </div>
);
