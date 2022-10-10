import { PropsWithChildren } from "react";
import { useMonacoConfigSupplier } from "../hooks/useMonacoConfigSupplier";

type Props = PropsWithChildren<{
  jsonParams?: string;
}>;

export default function MonacoWrapper({ children, jsonParams = "{}" }: Props) {
  useMonacoConfigSupplier({ jsonParams });
  return <>{children}</>;
}
