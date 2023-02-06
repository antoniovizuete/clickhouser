import { useConnectionContext } from "../contexts/useConnectionContext";

export default function ConnectionCaption() {
  const { getActiveConnection } = useConnectionContext();

  const activeConnection = getActiveConnection();

  if (!activeConnection) {
    return <div className="ml-1 text-neutral-500">No selected connection</div>;
  }
  return (
    <div className="ml-1">
      {activeConnection.name}{" "}
      <span className="text-neutral-400 text-xs">
        {activeConnection.name ? "(" : ""}
        {activeConnection.username}:*****@{activeConnection.host}:
        {activeConnection.port}
        {activeConnection.name ? ")" : ""}
      </span>
    </div>
  );
}
