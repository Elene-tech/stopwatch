import React, { useState } from 'react';
import styles from '../FormattedTime/FormattedTime.module.scss';
import { useEffect } from 'react';

const FormattedTime = () => {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [second, setSecond] = useState(0);
  const [mSecond, setMsecond] = useState(0);
  const [stop, setStop] = useState(true);

  const onStart = () => {
    setStop(false);
    //setMsecond(mSecond + 1);
  };

  const onStop = () => {
    setStop(true);
  };

  const onReset = () => {
    setHour(0);
    setMin(0);
    setSecond(0);
    setMsecond(0);
  };

  useEffect(() => {
    let interval = 0;
    if (!stop) {
      interval = setInterval(() => {
        if (min > 59) {
          setHour(hour + 1);
          setMin(0);
          clearInterval(interval);
        }
        if (second > 59) {
          setMin(hour + 1);
          setSecond(0);
          clearInterval(interval);
        }
        if (mSecond > 999) {
          setSecond(second + 1);
          setMsecond(0);
          clearInterval(interval);
        }
        if (mSecond <= 999) {
          setMsecond(mSecond + 1);
        }
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className={styles.formattedTime}>
      <h1>
        {hour} : {min} : {second} : {mSecond}
      </h1>
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
