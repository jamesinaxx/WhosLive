import type { FunctionComponent } from 'react';
import styled from 'styled-components';

const ContainerContainer = styled.div`
  margin-bottom: 110px;
  text-align: center;
`;

const Container: FunctionComponent = ({ children }) => (
  <ContainerContainer>{children}</ContainerContainer>
);

export default Container;
