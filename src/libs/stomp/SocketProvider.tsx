import { createContext, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { Cookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import { AuthSocketClient } from "./AuthSocketClient";

export const WebSocketContext = createContext<null | Client>(null);

export const WebSocketProvider = () => {
  const [client, setClient] = useState<null | Client>(null);

  useEffect(() => {
    const cookies = new Cookies(["accessToken"]);
    const accessToken = cookies.get("accessToken");
    const stompClient = new AuthSocketClient(accessToken);

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={client}>
      <Outlet />
    </WebSocketContext.Provider>
  );
};
