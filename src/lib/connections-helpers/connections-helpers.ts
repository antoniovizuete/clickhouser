import { Connection } from "../clickhouse-clients";

type Params = {
  connection?: Connection;
  excerpt?: boolean;
  showName?: boolean;
};

export const getConnectionDisplay = ({
  connection,
  excerpt = true,
  showName = true,
}: Params) => {
  if (!connection) {
    return "";
  }
  const { name, host, port, username } = connection;
  if (name && showName) {
    return name;
  }
  return `${username}:*****@${
    host.length > 30 && excerpt ? host.slice(0, 30) + "..." : host
  }:${port}`;
};
