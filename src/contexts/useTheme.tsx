import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  bpTheme: "bp4-dark" | undefined;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  bpTheme: undefined,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: PropsWithChildren<{}>) {
  const isDarkSystemTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [theme, setTheme] = useState<ThemeContextType["theme"]>(
    isDarkSystemTheme ? "dark" : "light"
  );
  const [bpTheme, setBpTheme] = useState<ThemeContextType["bpTheme"]>(
    isDarkSystemTheme ? "bp4-dark" : undefined
  );

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme as ThemeContextType["theme"]);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "light" ? "dark" : "light");
    root.classList.add(theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((oldTheme) => (oldTheme === "light" ? "dark" : "light"));
    setBpTheme((oldTheme) => (oldTheme === undefined ? "bp4-dark" : undefined));
  };

  const contextValue = { theme, bpTheme, toggleTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
