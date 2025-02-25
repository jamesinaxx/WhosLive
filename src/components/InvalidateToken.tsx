import type { RefObject } from "react";
import styled from "styled-components";
import { buttonClicked, buttonColor, buttonHover } from "../styleMixins";

interface InvalidateTokenProps {
  onChoice: (invalidate: boolean) => void;
  ref: RefObject<HTMLDialogElement | null>;
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

function InvalidateToken({ ref: dialogRef, onChoice }: InvalidateTokenProps) {
  return (
    <dialog
      ref={dialogRef}
      className="fixed z-1 min-h-screen min-w-screen p-14 text-center backdrop-blur-md transition-opacity duration-100 ease-in-out"
    >
      <h1>
        Are you sure you want to sign out?
        <br />
        To continue using Now Live you will have to log in again
      </h1>
      <ChoiceButtonButton
        onClick={() => {
          onChoice(true);
        }}
      >
        Yes
      </ChoiceButtonButton>
      <ChoiceButtonButton
        onClick={() => {
          onChoice(false);
        }}
      >
        No
      </ChoiceButtonButton>
    </dialog>
  );
}

export default InvalidateToken;
