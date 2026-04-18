"use client";
import { useEffect, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';

export default function TabVisibilityTracker() {
  const { isAuthenticated } = useAppContext();
  const notifSentRef = useRef(false);
  const hiddenTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        hiddenTimeRef.current = Date.now();
        notifSentRef.current = false;
      } else {
        hiddenTimeRef.current = null;
      }
    };

    const checkInactivity = () => {
      if (document.hidden && hiddenTimeRef.current && !notifSentRef.current) {
        const elapsed = Date.now() - hiddenTimeRef.current;
        if (elapsed > 30000) {
          notifSentRef.current = true;
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Hey! Atomic is still here waiting... 📚', {
              body: 'Come back and continue your study session!',
              icon: '/icon-192x192.png',
            });
          }
        }
      }
    };

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    const interval = setInterval(checkInactivity, 10000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  return null;
}
