import styles from '../styles/Loader.module.scss';

interface LoadingProps {
  hidden: boolean;
}

export default function Loading({ hidden }: LoadingProps) {
  const { color } = document.body.style;
  const circles = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div>
      <style>{`.lds_rollerDivs div:after {background: ${color};}`}</style>
      {!hidden && (
        <div
          className={`${styles.lds_roller} lds_rollerDivs`}
          id="loadingChannels"
        >
          {circles.map(key => (
            <div key={key} />
          ))}
        </div>
      )}
    </div>
  );
}
