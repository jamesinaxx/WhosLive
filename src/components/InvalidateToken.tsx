import styled from 'styled-components';
import { ComponentChildren } from 'preact';
import { buttonClicked, buttonColor, buttonHover } from '../styles/Mixins';

interface InvalidateTokenProps {
  onChoice: (invalidate: boolean) => void;
}

const RUSure = styled.div`
  z-index: 1;
  transition: opacity 100ms ease-in-out;
  position: fixed;
  width: 550px;
  height: 550px;
  padding: 50px;
  backdrop-filter: blur(10px);
  text-align: center;
  left: -40px;
  top: -50px;
`;

interface ChoiceButtonProps {
  children: ComponentChildren;
  type: 'button';
  onChoice: (confirm: boolean) => void;
  confirm: boolean;
}

const ChoiceButton = ({
  type,
  onChoice,
  confirm,
  children,
}: ChoiceButtonProps) => {
  const Button = styled.button`
    transition: background-color 100ms ease-in-out;
    width: 150px;
    height: 50px;
    letter-spacing: 0.5px;
    background-color: ${buttonColor};
    color: white;
    font-size: 2em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: ${buttonHover};
    }
    &:active {
      background-color: ${buttonClicked};
    }
    border-radius: ${confirm
      ? '100%, 0px, 0px, 100%'
      : 'border-radius: 0px, 100%, 100%, 0px;'};
  `;

  return (
    <Button onClick={() => onChoice(confirm)} type={type}>
      {children}
    </Button>
  );
};

export default function InvalidateToken({ onChoice }: InvalidateTokenProps) {
  document.body.style.overflow = 'hidden';

  return (
    <RUSure>
      <h1>
        Are you sure you want to sign out?
        <br />
        To continue using Now Live you will have to log in again
      </h1>
      <ChoiceButton type="button" onChoice={onChoice} confirm>
        Yes
      </ChoiceButton>
      <ChoiceButton type="button" onChoice={onChoice} confirm={false}>
        No
      </ChoiceButton>
    </RUSure>
  );
}
