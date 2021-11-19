import type { FunctionComponent } from 'react';
import { css } from '@emotion/react';

const Container: FunctionComponent = ({ children }) => (
  <div
    css={css`
      margin-bottom: 110px;
      text-align: center;
    `}
  >
    {children}
  </div>
);

export default Container;
