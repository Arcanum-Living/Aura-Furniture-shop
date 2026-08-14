'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isHydrated: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('aura_theme');
      if (savedTheme !== null) {
        // User has a saved preference
        setIsDarkMode(savedTheme === 'dark');
      } else {
        // No saved preference - check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
        // Save the detected preference
        localStorage.setItem('aura_theme', prefersDark ? 'dark' : 'light');
      }
    } catch (error) {
      console.error('Failed to initialize theme:', error);
      setIsDarkMode(false);
    }
    setIsHydrated(true);
  }, []);

  // Sync dark mode class to document and localStorage
  useEffect(() => {
    if (!isHydrated) return;

    try {
      // Apply/remove dark class
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // Persist preference
      localStorage.setItem('aura_theme', isDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to sync theme:', error);
    }
  }, [isDarkMode, isHydrated]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, isHydrated }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
