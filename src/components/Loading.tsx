import type { FunctionComponent } from 'react';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';
import { LoadingContainer } from './LoadingContainer';

const Loading: FunctionComponent<{ hidden?: boolean }> = ({ hidden }) => {
  if (hidden) return null;

  return (
    <LoadingContainer>
      <motion.span
        css={css`
          display: block;
          width: 5rem;
          height: 5rem;
        `}
        animate={{
          y: ['100%', '-100%'],
          background: ['#ff6699', '#6666ff'],
          borderRadius: ['50%', '5%'],
        }}
        transition={{
          y: {
            duration: 0.4,
            yoyo: Infinity,
            ease: 'easeOut',
          },
          background: {
            duration: 0.1,
            yoyo: Infinity,
            ease: 'easeOut',
            repeatDelay: 0.7,
          },
          borderRadius: {
            duration: 0.1,
            yoyo: Infinity,
            ease: 'easeOut',
            repeatDelay: 0.7,
          },
        }}
      />
    </LoadingContainer>
  );
};

export default Loading;
