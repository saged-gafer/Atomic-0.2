"use client";
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import AuthScreen from '@/components/auth/AuthScreen';
import { useAppContext } from '@/context/AppContext';

export default function Home() {
  const { isAuthenticated, isLoading } = useAppContext();

  if (isLoading) return null;
  if (!isAuthenticated) return <AuthScreen />;
  return <Dashboard />;
}
