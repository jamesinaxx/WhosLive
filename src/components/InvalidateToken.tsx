import type { RefObject } from "react";

interface InvalidateTokenProps {
  onChoice: (invalidate: boolean) => void;
  ref: RefObject<HTMLDialogElement | null>;
}

function InvalidateToken({ ref: dialogRef, onChoice }: InvalidateTokenProps) {
  return (
    <dialog
      ref={dialogRef}
      className="prose fixed z-1 min-h-screen min-w-screen p-14 text-center backdrop-blur-md transition-opacity duration-100 ease-in-out"
    >
      <h1>Are you sure?</h1>
      <p>
        You are about to sign out. To continue using Now Live you will have to
        log in again.
      </p>
      <button
        className="btn btn-secondary btn-lg mr-4"
        onClick={() => {
          onChoice(true);
        }}
      >
        Yes
      </button>
      <button
        className="btn btn-primary btn-lg"
        onClick={() => {
          onChoice(false);
        }}
      >
        No
      </button>
    </dialog>
  );
}

export default InvalidateToken;
