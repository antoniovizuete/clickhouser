import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type PasswordContextType = {
  password: string | undefined;
  setPassword: (password: string | undefined) => void;
};

const PasswordContext = createContext<PasswordContextType>({
  password: undefined,
  setPassword: () => {},
});

export function PasswordProvider({ children }: PropsWithChildren<{}>) {
  const [password, setPassword] = useState<PasswordContextType["password"]>();

  const contextValue = { password, setPassword };

  return (
    <PasswordContext.Provider value={contextValue}>
      {children}
    </PasswordContext.Provider>
  );
}

export function usePasswordContext() {
  const context = useContext(PasswordContext);
  if (context === undefined) {
    throw new Error("usePassword must be used within a PasswordProvider");
  }
  return context;
}
