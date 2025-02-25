import type { FunctionComponent, PropsWithChildren } from "react";
import styled from "styled-components";

const ContainerContainer = styled.div`
  margin-bottom: 110px;
  text-align: center;
`;

const Container: FunctionComponent<PropsWithChildren<unknown>> = ({
  children,
}) => <ContainerContainer>{children}</ContainerContainer>;

export default Container;
