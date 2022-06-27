import type { FunctionComponent, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const MotionDiv = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const MotionSpan = styled(motion.span)`
  display: block;
  width: 5rem;
  height: 5rem;
`;

const Loading: FunctionComponent<PropsWithChildren<{ hidden?: boolean }>> = ({
  hidden,
}) => {
  if (hidden) return null;

  return (
    <MotionDiv
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
    >
      <MotionSpan
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
    </MotionDiv>
  );
};

export default Loading;
