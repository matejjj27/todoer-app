import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState
} from "react";
interface UI {
  isDarkMode: boolean;
  setDarkMode: () => void;
}

interface UIProviderProps {
  children: ReactNode;
}

export const UIContext = createContext<UI>({
  isDarkMode: true,
  setDarkMode: () => console.warn("setDarkMode not implemented")
});

const UIProvider = ({ children }: UIProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const darkMode = localStorage.getItem("darkMode");
    return darkMode === null ? true : darkMode === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const setDarkMode = useCallback(() => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.classList.toggle("dark", newMode);
      localStorage.setItem("darkMode", String(newMode));
      return newMode;
    });
  }, []);

  const value = {
    isDarkMode,
    setDarkMode
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export default UIProvider;
