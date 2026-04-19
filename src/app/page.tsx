"use client";
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import AuthScreen from '@/components/auth/AuthScreen';
import GenderSelectScreen from '@/components/anime/GenderSelectScreen';
import { useAppContext } from '@/context/AppContext';

export default function Home() {
  const { isAuthenticated, isLoading, gender } = useAppContext();

  if (isLoading) return null;

  if (!isAuthenticated) return <AuthScreen />;

  if (!gender) return <GenderSelectScreen />;

  return <Dashboard />;
}
