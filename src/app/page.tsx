"use client";
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Dashboard from '@/components/dashboard/Dashboard';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import SplashScreen from '@/components/splash/SplashScreen';
import AuthCard from '@/components/auth/AuthCard';
import { useAppContext } from '@/context/AppContext';

type AuthStep = 'auth' | 'onboarding';

export default function Home() {
  const { isAuthenticated, isLoading } = useAppContext();
  const [splashState, setSplashState] = useState<'pending' | 'showing' | 'done'>('pending');
  const [authStep, setAuthStep] = useState<AuthStep>('auth');

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

  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        {authStep === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AuthCard onContinue={() => setAuthStep('onboarding')} />
          </motion.div>
        )}
        {authStep === 'onboarding' && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <OnboardingFlow />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return <Dashboard />;
}
