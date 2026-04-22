import { createContext, useContext, type ReactNode } from 'react';

interface HelpCenterContextValue {
  config: any;
  projectId: string;
  isDark: boolean;
  toggleTheme: () => void;
}

const HelpCenterContext = createContext<HelpCenterContextValue | null>(null);

interface HelpCenterProviderProps {
  config: any;
  projectId: string;
  isDark: boolean;
  toggleTheme: () => void;
  children: ReactNode;
}

export function HelpCenterProvider({ config, projectId, isDark, toggleTheme, children }: HelpCenterProviderProps) {
  return (
    <HelpCenterContext.Provider value={{ config, projectId, isDark, toggleTheme }}>
      {children}
    </HelpCenterContext.Provider>
  );
}

export function useHelpCenter() {
  const ctx = useContext(HelpCenterContext);
  if (!ctx) throw new Error('useHelpCenter must be used within HelpCenterProvider');
  return ctx;
}
