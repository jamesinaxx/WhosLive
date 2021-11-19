import type { FunctionComponent } from 'react';
import { css, useTheme } from '@emotion/react';
import { LoadingContainer } from './LoadingContainer';

const Loading: FunctionComponent<{ hidden?: boolean }> = ({ hidden }) => {
  const theme = useTheme();
  if (hidden) return null;

  return (
    <LoadingContainer>
      {Array(8).map(() => (
        <div
          css={css`
            &::after {
              background: ${theme.colors.color};
            }
          `}
        />
      ))}
    </LoadingContainer>
  );
};

export default Loading;
