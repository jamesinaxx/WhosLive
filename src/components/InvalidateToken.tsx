import {
  useEffect,
  useRef,
  type FunctionComponent,
  type PropsWithChildren,
} from "react";
import styled from "styled-components";
import { buttonClicked, buttonColor, buttonHover } from "../styleMixins";

interface InvalidateTokenProps {
  onChoice: (invalidate: boolean) => void;
}

interface ChoiceButtonProps {
  onChoice: (confirm: boolean) => void;
  confirm: boolean;
}

const ChoiceButtonButton = styled.button`
  transition: background-color 100ms ease-in-out;
  width: 150px;
  height: 50px;
  letter-spacing: 0.5px;
  background-color: ${buttonColor};
  color: white;
  font-size: 2em;
  border: none;
  cursor: pointer;
  border-radius: 1rem;

  &:hover {
    background-color: ${buttonHover};
  }
  &:active {
    background-color: ${buttonClicked};
  }

  &:first-of-type {
    margin-right: 1rem;
  }
`;

const InvalidateTokenContainer = styled.div`
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

const InvalidateToken: FunctionComponent<
  PropsWithChildren<InvalidateTokenProps>
> = ({ onChoice }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialog.current?.showModal();

    // TODO: Get rid of this
    // document.body.style.overflow = "hidden";
    return () => {
      // document.body.style.overflow = "";
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className="fixed z-1 min-h-screen min-w-screen p-14 text-center backdrop-blur-md transition-opacity duration-100 ease-in-out"
    >
      <h1>
        Are you sure you want to sign out?
        <br />
        To continue using Now Live you will have to log in again
      </h1>
      <ChoiceButtonButton
        onClick={() => {
          dialog.current?.close();
          onChoice(true);
        }}
      >
        Yes
      </ChoiceButtonButton>
      <ChoiceButtonButton
        onClick={() => {
          dialog.current?.close();
          onChoice(false);
        }}
      >
        No
      </ChoiceButtonButton>
    </dialog>
  );
};

export default InvalidateToken;
