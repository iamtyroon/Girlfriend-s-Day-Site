"use client";

import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    let year = now.getFullYear();
    let countdownDate = new Date(year, 10, 28); // Month is 0-indexed, so 10 is November

    if (now > countdownDate) {
      // If the date has passed for this year, count down to next year's date
      countdownDate = new Date(year + 1, 10, 28);
    }

    const difference = countdownDate.getTime() - now.getTime();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
        return;
    }

    timerComponents.push(
      <div key={interval} className="text-center p-4 bg-card rounded-lg shadow-lg border border-primary">
        <div className="text-5xl font-bold text-accent">
          {timeLeft[interval as keyof typeof timeLeft]}
        </div>
        <div className="text-sm uppercase mt-2 text-foreground">
          {interval}
        </div>
      </div>
    );
  });

  return (
    <div className="flex justify-center items-center h-full">
      {timerComponents.length ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {timerComponents}
        </div>
      ) : (
        <span className="text-2xl text-accent">The wait is over!</span>
      )}
    </div>
  );
};


export default function WhereYouBloomPage() {
  return (
    <section id="where-you-bloom" className="py-16 px-4 h-[80vh] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-accent mb-12 text-center">Countdown to November 28th</h2>
      <CountdownTimer />
    </section>
  );
}
