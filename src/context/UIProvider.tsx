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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    const isDark = darkMode === "false";
    document.body.classList.toggle("dark", isDark);
    setIsDarkMode(isDark);
    localStorage.setItem("darkMode", String(isDark));
  }, []);

  const setDarkMode = useCallback(() => {
    const isDark = !isDarkMode;
    document.body.classList.toggle("dark", isDark);
    setIsDarkMode(isDark);
    localStorage.setItem("darkMode", String(isDark));
  }, [isDarkMode]);

  const value = {
    isDarkMode,
    setDarkMode
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export default UIProvider;
