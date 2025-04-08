import React, { useState, useEffect } from "react";
import logo from "./navbar/static/hack-logo.png"; // Ensure the logo path is correct
import "./hero/hero.css";
import "./hero/btn.css";
import { GlitchImage } from "react-glitch-image";
import "./cntndn.css";
import "./timer/timer.scss"; // Ensure the styles are applied

const Time = () => {
  const [width, setWidth] = useState('25%');
  const [remainingTime, setRemainingTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [state, setState] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  // Load saved remaining time from local storage
  useEffect(() => {
    const savedTime = localStorage.getItem('remainingTime');
    const currentTime = Date.now();

    if (savedTime) {
      const timeLeft = parseInt(savedTime, 10) - currentTime; // Calculate remaining time
      if (timeLeft > 0) {
        setRemainingTime(timeLeft);
        setTimerActive(true);
      } else {
        localStorage.removeItem('remainingTime'); // Clear if expired
      }
    }
  }, []);

  useEffect(() => {
    let interval;

    if (timerActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prev => {
          const newTime = prev - 1000; // Decrease by 1 second
          localStorage.setItem('remainingTime', Date.now() + newTime); // Save updated end time

          if (newTime <= 0) {
            clearInterval(interval);
            localStorage.removeItem('remainingTime');
            setTimerActive(false);
            return 0; // Reset to zero
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [timerActive, remainingTime]);

  useEffect(() => {
    if (remainingTime > 0) {
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      setState({
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
      });
    }
  }, [remainingTime]);

  const startCountdown = () => {
    const newRemainingTime = (2 * 60 * 60 * 1000) + (15 * 60 * 1000); // 2 hours and 15 minutes in milliseconds
    setRemainingTime(newRemainingTime);
    localStorage.setItem('remainingTime', Date.now() + newRemainingTime); // Save end time
    setTimerActive(true);
  };

  const resetCountdown = () => {
    setRemainingTime(0);
    localStorage.removeItem('remainingTime');
    setState({ hours: '00', minutes: '00', seconds: '00' });
    setTimerActive(false);
  };

  return (
    <div className="time-container">
      <GlitchImage
        className="glitch-image"
        image={logo}
        width={width}
        animationDuration={400}
        animationInterval={3000}
        activeFxOnHover={false}
        activeFxOnInterval={true}
      />
      <div className="countdown-txt">
        <h2>The countdown begins....</h2>
      </div>
      <div className='countdown-wrapper'>
        <div className='time-section'>
          <div className='time'>{state.hours}</div>
          <small className="time-text">Hours</small>
        </div>
        <div className='time-section'>
          <div className='time'>:</div>
        </div>
        <div className='time-section'>
          <div className='time'>{state.minutes}</div>
          <small className="time-text">Minutes</small>
        </div>
        <div className='time-section'>
          <div className='time'>:</div>
        </div>
        <div className='time-section'>
          <div className='time'>{state.seconds}</div>
          <small className="time-text">Seconds</small>
        </div>
      </div>
      <div className="button-container">
        <button onClick={startCountdown} className="bt">Start</button>
        <button onClick={resetCountdown} className="bt">Reset</button>
      </div>
    </div>
  );
};

export default Time;
