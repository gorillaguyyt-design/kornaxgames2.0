import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProxyContextType {
  selectedNodeId: string;
  setSelectedNodeId: (id: string) => void;
}

const ProxyContext = createContext<ProxyContextType | undefined>(undefined);

export const ProxyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(() => {
    return localStorage.getItem('selectedRammerheadNode') || 'rammerhead-1'; // Nana is rammerhead-1
  });

  useEffect(() => {
    localStorage.setItem('selectedRammerheadNode', selectedNodeId);
  }, [selectedNodeId]);

  return (
    <ProxyContext.Provider value={{ selectedNodeId, setSelectedNodeId }}>
      {children}
    </ProxyContext.Provider>
  );
};

export const useProxy = () => {
  const context = useContext(ProxyContext);
  if (context === undefined) {
    throw new Error('useProxy must be used within a ProxyProvider');
  }
  return context;
};
