"use client";
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Dashboard from '@/components/dashboard/Dashboard';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import SplashScreen from '@/components/splash/SplashScreen';
import AuthLanding from '@/components/auth/AuthLanding';
import SignUpScreen from '@/components/auth/SignUpScreen';
import LoginScreen from '@/components/auth/LoginScreen';
import { useAppContext } from '@/context/AppContext';

type AuthStep = 'landing' | 'signup' | 'login' | 'onboarding';

export default function Home() {
  const { isAuthenticated, isLoading } = useAppContext();
  const [splashState, setSplashState] = useState<'pending' | 'showing' | 'done'>('pending');
  const [authStep, setAuthStep] = useState<AuthStep>('landing');

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
        {authStep === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AuthLanding onChoose={(mode) => setAuthStep(mode)} />
          </motion.div>
        )}
        {authStep === 'signup' && (
          <motion.div
            key="signup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SignUpScreen
              onBack={() => setAuthStep('landing')}
              onContinue={() => setAuthStep('onboarding')}
              onSwitchToLogin={() => setAuthStep('login')}
            />
          </motion.div>
        )}
        {authStep === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LoginScreen
              onBack={() => setAuthStep('landing')}
              onContinue={() => setAuthStep('onboarding')}
              onSwitchToSignup={() => setAuthStep('signup')}
            />
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
