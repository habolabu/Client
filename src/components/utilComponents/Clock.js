// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React, { useEffect } from 'react';
import { useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState('');

  const formatTime = (value) => {
    if (value < 10) {
      return '0';
    } else return '';
  };

  const tick = () => {
    const d = new Date();
    const h = formatTime(d.getHours());
    const m = formatTime(d.getMinutes());
    const s = formatTime(d.getSeconds());
    setTime(h + d.getHours() + ':' + m + d.getMinutes() + ':' + s + d.getSeconds());
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div className="clock">
      <div className={parseInt(time.slice(0, 2)) >= 6 && parseInt(time.slice(0, 2)) <= 18 ? 'card day' : 'card'}>
        <div id="wrapper">
          <div id="nightbg"></div>
          <div className="zzz1"></div>
          <div className="zzz2"></div>
          <div className="zzz3"></div>
          <div className="planet">
            <div className="face">
              <div className="eye">
                <div className="eye-in"></div>
              </div>
              <div className="mouth"></div>
              <div className="eye">
                <div className="eye-in"></div>
              </div>
            </div>
          </div>
          <div className="star pos-star1 "></div>
          <div className="star pos-star2 "></div>
          <div className="star pos-star3 "></div>
        </div>
        <div className="temp">
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default Clock;
