import { useThemeContext } from "../contexts/useThemeContext";
import ThemedButton from "./ThemedButton";

export default function SelectThemeButton() {
  const { bpTheme, toggleTheme } = useThemeContext();

  return (
    <ThemedButton action={toggleTheme} icon={bpTheme ? "flash" : "moon"} />
  );
}
