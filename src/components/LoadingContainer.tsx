import styled, { keyframes } from 'styled-components';
import * as mixins from '../styles/Mixins';

export const LoadingAnim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
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
      ${mixins.animationChild(-0.036, 63, 63)};
    }
    &:nth-child(2) {
      ${mixins.animationChild(-0.072, 68, 56)};
    }
    &:nth-child(3) {
      ${mixins.animationChild(-0.108, 71, 48)};
    }
    &:nth-child(4) {
      ${mixins.animationChild(-0.144, 72, 40)};
    }
    &:nth-child(5) {
      ${mixins.animationChild(-0.18, 71, 32)};
    }
    &:nth-child(6) {
      ${mixins.animationChild(-0.216, 68, 24)};
    }
    &:nth-child(7) {
      ${mixins.animationChild(-0.252, 63, 17)};
    }
    &:nth-child(8) {
      ${mixins.animationChild(-0.288, 56, 12)};
    }
  }
`;
