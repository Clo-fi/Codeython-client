import { useContext } from "react";
import { WebSocketContext } from "./SocketProvider";

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
