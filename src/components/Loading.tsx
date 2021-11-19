import type { FunctionComponent } from 'react';
import { css, useTheme } from '@emotion/react';
import { LoadingContainer } from './LoadingContainer';
import { animationChild } from '../styleMixins';

const Dots = () => {
  const theme = useTheme();

  return (
    <>
      {[...Array(8).keys()].map(() => (
        <div
          css={css`
            &::after {
              background: ${theme.colors.color};
            }
            &:nth-of-type(1) {
              ${animationChild(-0.036, 63, 63)};
            }
            &:nth-of-type(2) {
              ${animationChild(-0.072, 68, 56)};
            }
            &:nth-of-type(3) {
              ${animationChild(-0.108, 71, 48)};
            }
            &:nth-of-type(4) {
              ${animationChild(-0.144, 72, 40)};
            }
            &:nth-of-type(5) {
              ${animationChild(-0.18, 71, 32)};
            }
            &:nth-of-type(6) {
              ${animationChild(-0.216, 68, 24)};
            }
            &:nth-of-type(7) {
              ${animationChild(-0.252, 63, 17)};
            }
            &:nth-of-type(8) {
              ${animationChild(-0.288, 56, 12)};
            }
          `}
        />
      ))}
    </>
  );
};

const Loading: FunctionComponent<{ hidden?: boolean }> = ({ hidden }) => {
  if (hidden) return null;

  return (
    <LoadingContainer>
      <Dots />
    </LoadingContainer>
  );
};

export default Loading;
