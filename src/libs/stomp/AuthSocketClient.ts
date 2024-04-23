import { Client, IMessage } from "@stomp/stompjs";

export class AuthSocketClient extends Client {
  constructor(accessToken: string) {
    super({
      brokerURL: import.meta.env.VITE_SOCKET_BASE_URL,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onDisconnect: () => {
        console.log("소켓 연결을 해제합니다.");
      },
      onConnect: () => {
        console.log("소켓 연결에 성공했습니다.");
      },
    });
  }

  publish(params: {
    destination: string;
    body?: string;
    headers?: { [key: string]: string };
  }) {
    super.publish({
      ...params,
      headers: {
        ...params.headers,
        Authorization: this.connectHeaders.Authorization,
      },
    });
  }

  subscribe(
    destination: string,
    callback: (message: IMessage) => void,
    headers?: { [key: string]: string }
  ) {
    return super.subscribe(destination, callback, {
      ...headers,
      Authorization: this.connectHeaders.Authorization,
    });
  }
}
