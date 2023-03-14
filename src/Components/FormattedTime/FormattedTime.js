import React, { useState } from 'react';
import styles from '../FormattedTime/FormattedTime.module.scss';
import { useEffect } from 'react';

const FormattedTime = () => {
  const [mSecond, setMsecond] = useState(0);
  const [interval, setMsInterval] = useState(null);

  const onStart = () => {
    if (!interval) {
      setMsInterval(
        setInterval(() => {
          setMsecond((state) => state + 100);
        }, 100)
      );
    }
  };

  const onStop = () => {
    if (interval) {
      clearInterval(interval);
      setMsInterval(null);
    }
  };

  const onReset = () => {
    setMsecond(0);
  };

  const getTimer = (s) => {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs + '.' + ms;
  };

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.formattedTime}>
      <h1>{getTimer(mSecond)}</h1>
      <div className={styles.button_container}>
        <button className={styles.button} onClick={onStart}>
          Start
        </button>
        <button className={styles.button} onClick={onStop}>
          Stop
        </button>
        <button className={styles.button} onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default FormattedTime;
