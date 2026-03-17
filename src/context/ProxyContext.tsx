import React, { createContext, useContext, useState, useEffect } from 'react';

export type ProxyMode = 'libcurl' | 'epoxy';

interface ProxyContextType {
  proxyMode: ProxyMode;
  setProxyMode: (mode: ProxyMode) => void;
}

const ProxyContext = createContext<ProxyContextType | undefined>(undefined);

export const ProxyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [proxyMode, setProxyMode] = useState<ProxyMode>(() => {
    const saved = localStorage.getItem('proxyMode') as ProxyMode;
    return (saved === 'libcurl' || saved === 'epoxy') ? saved : 'libcurl';
  });

  useEffect(() => {
    localStorage.setItem('proxyMode', proxyMode);
  }, [proxyMode]);

  return (
    <ProxyContext.Provider value={{ proxyMode, setProxyMode }}>
      {children}
    </ProxyContext.Provider>
  );
};

export const useProxy = () => {
  const context = useContext(ProxyContext);
  if (!context) throw new Error('useProxy must be used within a ProxyProvider');
  return context;
};
