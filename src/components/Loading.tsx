import styles from '../styles/Loader.module.scss';

interface LoadingProps {
  hidden: boolean;
}

export default function Loading({ hidden }: LoadingProps) {
  const docBody = document.querySelector('body') as HTMLBodyElement;

  const bodyColor = docBody.style.color;

  const circles: string[] = new Array(8).fill('');

  return (
    <div>
      <style>{`.lds_rollerDivs div:after {background: ${bodyColor};}`}</style>
      {!hidden && (
        <div
          className={`${styles.lds_roller} lds_rollerDivs`}
          id="loadingChannels"
        >
          {circles.map(() => (
            <div />
          ))}
        </div>
      )}
    </div>
  );
}
