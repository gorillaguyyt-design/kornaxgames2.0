import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  buttonColor: string;
  accentColor: string;
  setButtonColor: (color: string) => void;
  setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [buttonColor, setButtonColor] = useState(() => localStorage.getItem('buttonColor') || '#f97316');
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('accentColor') || '#f97316');

  useEffect(() => {
    document.documentElement.style.setProperty('--btn-color', buttonColor);
    localStorage.setItem('buttonColor', buttonColor);
  }, [buttonColor]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);
    localStorage.setItem('accentColor', accentColor);
  }, [accentColor]);

  return (
    <ThemeContext.Provider value={{ buttonColor, accentColor, setButtonColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
