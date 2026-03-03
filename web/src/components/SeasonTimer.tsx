"use client";

import { useEffect, useState } from "react";

interface SeasonTimerProps {
  endTime: string;
  label?: string;
}

export default function SeasonTimer({ endTime, label = "Season ends in" }: SeasonTimerProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const end = new Date(endTime).getTime();
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Season ended");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="text-center">
      <p className="text-sm text-zinc-400 uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-bold text-amber-400 font-mono">{timeLeft}</p>
    </div>
  );
}
