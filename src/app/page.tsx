"use client";
import React, { useState, useEffect } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import AuthScreen from '@/components/auth/AuthScreen';
import SplashScreen from '@/components/splash/SplashScreen';
import { useAppContext } from '@/context/AppContext';

export default function Home() {
  const { isAuthenticated, isLoading } = useAppContext();
  const [splashState, setSplashState] = useState<'pending' | 'showing' | 'done'>('pending');

  useEffect(() => {
    const seen = sessionStorage.getItem('atomic_splash_seen');
    if (seen) {
      setSplashState('done');
    } else {
      setSplashState('showing');
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('atomic_splash_seen', 'true');
    setSplashState('done');
  };

  if (splashState === 'pending') return null;

  if (splashState === 'showing') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (isLoading) return null;

  if (!isAuthenticated) return <AuthScreen />;

  return <Dashboard />;
}
