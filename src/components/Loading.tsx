import styled from 'styled-components';
import { LoadingContainer } from './LoadingContainer';

const Circle = styled.div`
  &::after {
    background: ${props => props.theme.colors.after};
  }
`;

export default function Loading({ hidden }: { hidden?: boolean }) {
  console.log(hidden);
  if (hidden) return <>{null}</>;

  return (
    <LoadingContainer>
      {[1, 2, 3, 4, 5, 6, 7, 8].map(key => (
        <Circle
          key={key}
          theme={{ colors: { after: document.body.style.color } }}
        />
      ))}
    </LoadingContainer>
  );
}
