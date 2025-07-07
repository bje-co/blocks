import styles from './Boundaries.module.scss';

const SuspenseFallback = () => {
  return (
    <div className={styles['_']}>
      <div className={styles['Suspending']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SuspenseFallback;
