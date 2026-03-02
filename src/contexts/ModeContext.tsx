import { createContext, useContext, useState, ReactNode } from "react";

type AppMode = "order" | "chaos";

interface ModeContextType {
  mode: AppMode;
  toggleMode: () => void;
  setMode: (mode: AppMode) => void;
}

const ModeContext = createContext<ModeContextType>({
  mode: "order",
  toggleMode: () => {},
  setMode: () => {},
});

export const useMode = () => useContext(ModeContext);

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<AppMode>("order");

  const toggleMode = () => setMode((m) => (m === "order" ? "chaos" : "order"));

  return (
    <ModeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};
