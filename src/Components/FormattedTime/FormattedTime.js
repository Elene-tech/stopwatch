import React, { useState } from 'react';
import styles from '../FormattedTime/FormattedTime.module.scss';
import { useEffect } from 'react';

const FormattedTime = () => {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [second, setSecond] = useState(0);
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
    }
  };

  const onReset = () => {
    setMsecond(0);
  };

  const getTimer = (mSecond) => {
    let hours = mSecond / (1000 * 60 * 60);
    let fullHour = Math.floor(hours);
    let h = fullHour > 9 ? fullHour : '0' + fullHour;

    let minutes = (hours - fullHour) * 60;
    let fullMinute = Math.floor(minutes);
    let m = fullMinute > 9 ? fullMinute : '0' + fullMinute;

    let seconds = (minutes - fullMinute) * 60;
    let fullSeconds = Math.floor(seconds);
    let s = fullSeconds > 9 ? fullSeconds : '0' + fullSeconds;

    return h + ':' + m + ':' + s;
  };

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
