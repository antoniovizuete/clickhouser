import { Button, Icon, IconName } from "@blueprintjs/core";
import { useThemeContext } from "../contexts/useThemeContext";

type Props = {
  action?: () => void;
  icon: IconName;
};

export default function ThemedButton({ action, icon }: Props) {
  const { bpTheme } = useThemeContext();

  return (
    <Button
      className={"dark:bg-[#383e47] dark:hover:bg-[#2f343c]"}
      icon={<Icon icon={icon} color={bpTheme ? "white" : "#383e47"} />}
      onClick={() => action?.()}
    />
  );
}
