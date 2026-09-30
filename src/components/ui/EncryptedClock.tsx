'use client';

import React, { useState, useEffect } from 'react';
import { usePuzzle } from '@/context/PuzzleContext';
import { motion, AnimatePresence } from 'framer-motion';

export const EncryptedClock: React.FC = () => {
  const { unlockedKeys, scrambleText } = usePuzzle();
  const k = unlockedKeys.length;

  const [timeLeft, setTimeLeft] = useState({
    days: 183,
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  const [displayString, setDisplayString] = useState('███:██:██:██');

  // 1. Countdown timer update (runs every second)
  useEffect(() => {
    // Target date: Dec 31, 2026 23:59:59
    const targetDate = new Date('2026-12-31T23:59:59+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  // 2. Scramble update loop (runs every 60ms)
  useEffect(() => {
    const scrambleLoop = () => {
      const daysStr = timeLeft.days.toString().padStart(3, '0');
      const hoursStr = timeLeft.hours.toString().padStart(2, '0');
      const minutesStr = timeLeft.minutes.toString().padStart(2, '0');
      const secondsStr = timeLeft.seconds.toString().padStart(2, '0');

      const parts = [
        { text: daysStr, resolved: k >= 1 },
        { text: hoursStr, resolved: k >= 2 },
        { text: minutesStr, resolved: k >= 3 },
        { text: secondsStr, resolved: k >= 4 }
      ];

      // Form the output characters
      const resultChars: string[] = [];
      parts.forEach((part, index) => {
        if (part.resolved) {
          resultChars.push(...part.text.split(''));
        } else {
          // Use scrambleText on the unresolved portion, passing the current key count k
          const scrambled = scrambleText(part.text, k);
          resultChars.push(...scrambled.split(''));
        }
        if (index < parts.length - 1) {
          resultChars.push(':');
        }
      });

      setDisplayString(resultChars.join(''));
    };

    const interval = setInterval(scrambleLoop, 60);
    return () => clearInterval(interval);
  }, [timeLeft, k, scrambleText]);

  return (
    <div className="relative flex flex-col items-center justify-center p-8 rounded-xl glass-panel border-slate-800/80 overflow-hidden w-full max-w-2xl mx-auto">
      {/* Background Ripple Animations matching clock scramble state */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className={`absolute w-72 h-72 rounded-full border border-cyan-500/10 ${k < 4 ? 'animate-ripple' : 'animate-pulse'}`} style={{ animationDuration: k < 4 ? '1.2s' : '3s' }} />
        {k < 4 && (
          <div className="absolute w-96 h-96 rounded-full border border-cyan-500/5 animate-ripple" style={{ animationDelay: '0.6s', animationDuration: '1.2s' }} />
        )}
      </div>

      {/* Clock Top Details */}
      <div className="z-10 flex justify-between w-full mb-4 px-2 font-mono text-xs text-slate-500">
        <div>CODENAME: SOVEREIGN_LAUNCH</div>
        <div className="text-cyan-400 font-bold">DECRYPT_STAGE: {k}/4</div>
      </div>

      {/* Countdown Clock Face */}
      <div className="z-10 font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-slate-50 glow-cyan select-none py-4 px-6 rounded bg-slate-950/80 border border-slate-800/50">
        {displayString}
      </div>

      {/* Labels */}
      <div className="z-10 grid grid-cols-4 w-full mt-4 font-mono text-[10px] sm:text-xs text-center text-slate-400 select-none">
        <div className={k >= 1 ? 'text-cyan-400 font-bold' : 'text-slate-500'}>DAYS</div>
        <div className={k >= 2 ? 'text-cyan-400 font-bold' : 'text-slate-500'}>HOURS</div>
        <div className={k >= 3 ? 'text-cyan-400 font-bold' : 'text-slate-500'}>MINUTES</div>
        <div className={k >= 4 ? 'text-cyan-400 font-bold' : 'text-slate-500'}>SECONDS</div>
      </div>

      {/* Helper Notification Banner */}
      <div className="z-10 mt-6 w-full text-center">
        <AnimatePresence mode="wait">
          {k === 4 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs font-mono text-green-400 bg-green-950/20 border border-green-500/30 px-4 py-2 rounded-lg"
            >
              ⚡ DECRYPTION SECURED. STRATEGIC LAUNCH CLOCK STABILIZED.
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-mono text-cyan-400/80 bg-slate-900/60 px-4 py-2 rounded-lg border border-slate-800"
            >
              🔒 SYSTEM STATUS: ENCRYPTED. UNLOCK PILLAR SECRETS TO DECRYPT LAUNCH STAMP.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
