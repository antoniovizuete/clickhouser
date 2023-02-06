export type ConnectionId = {
  id: string;
};

export type ConnectionBody = {
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  secure: boolean;
};

export type Connection = ConnectionId & ConnectionBody;

export type ClickhouseConnectionParams = {
  username: string;
  password?: string;
  serverAddress: string;
};
