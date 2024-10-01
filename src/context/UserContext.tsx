// context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  clientName: string | null;
  setClientName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [clientName, setClientName] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ clientName, setClientName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
