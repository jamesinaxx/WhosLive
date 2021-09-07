import styled from 'styled-components';
import { LoadingContainer } from './LoadingContainer';

const Circle = styled.div`
  &::after {
    background: ${props => props.theme.colors.color};
  }
`;

export default function Loading({ hidden }: { hidden?: boolean }) {
  if (hidden) return <>{null}</>;

  return (
    <LoadingContainer>
      {[1, 2, 3, 4, 5, 6, 7, 8].map(key => (
        <Circle key={key} />
      ))}
    </LoadingContainer>
  );
}
