import { useConnectionContext } from "../contexts/useConnectionContext";
import { getConnectionDisplay } from "../lib/connections-helpers";

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
        {getConnectionDisplay({
          connection: activeConnection,
          showName: false,
          excerpt: !!activeConnection.name,
        })}
        {activeConnection.name ? ")" : ""}
      </span>
    </div>
  );
}
