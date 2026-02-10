import { useEffect, useState } from 'react';

export function useAFK(afkTime: number = 30 * 60 * 1000) {
  const [isAFK, setIsAFK] = useState(false);

  useEffect(() => {
    let afkTimeout: ReturnType<typeof setTimeout>;
    const resetAFKTimer = () => {
      clearTimeout(afkTimeout);
      setIsAFK(false);
      afkTimeout = setTimeout(() => setIsAFK(true), afkTime);
    };

    const events: (keyof WindowEventMap)[] = [
      'mousemove',
      'keydown',
      'scroll',
      'touchstart',
      'click',
      'wheel',
    ];

    resetAFKTimer();
    events.forEach((event) => window.addEventListener(event, resetAFKTimer));

    return () => {
      clearTimeout(afkTimeout);
      events.forEach((event) => window.removeEventListener(event, resetAFKTimer));
    };
  }, [afkTime]);

  return isAFK;
}
