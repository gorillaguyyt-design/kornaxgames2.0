import React, { createContext, useContext, useEffect, useState } from 'react';

export type CloakType = 'none' | 'google' | 'quizlet' | 'kahoot' | 'blooket';

interface CloakConfig {
  title: string;
  icon: string;
}

const CLOAK_CONFIGS: Record<CloakType, CloakConfig> = {
  none: {
    title: 'Nebula Hub | Games, Apps & Entertainment',
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%237c3aed%22/><path d=%22M30 30h40v40H30z%22 fill=%22white%22/></svg>'
  },
  google: {
    title: 'Google',
    icon: 'https://www.google.com/favicon.ico'
  },
  quizlet: {
    title: 'Quizlet',
    icon: 'https://quizlet.com/favicon.ico'
  },
  kahoot: {
    title: 'Kahoot!',
    icon: 'https://kahoot.it/favicon.ico'
  },
  blooket: {
    title: 'Blooket',
    icon: 'https://www.blooket.com/favicon.ico'
  }
};

interface TabCloakContextType {
  cloak: CloakType;
  setCloak: (cloak: CloakType) => void;
}

const TabCloakContext = createContext<TabCloakContextType | undefined>(undefined);

export function TabCloakProvider({ children }: { children: React.ReactNode }) {
  const [cloak, setCloakState] = useState<CloakType>(() => {
    return (localStorage.getItem('nebula-cloak') as CloakType) || 'none';
  });

  const setCloak = (newCloak: CloakType) => {
    setCloakState(newCloak);
    localStorage.setItem('nebula-cloak', newCloak);
  };

  useEffect(() => {
    const config = CLOAK_CONFIGS[cloak];
    document.title = config.title;
    
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = config.icon;
  }, [cloak]);

  return (
    <TabCloakContext.Provider value={{ cloak, setCloak }}>
      {children}
    </TabCloakContext.Provider>
  );
}

export function useTabCloak() {
  const context = useContext(TabCloakContext);
  if (context === undefined) {
    throw new Error('useTabCloak must be used within a TabCloakProvider');
  }
  return context;
}
