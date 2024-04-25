import { IMessage } from "@stomp/stompjs";

export const MESSAGE_TYPE = {
  CHAT: "CHAT",
  USER: "USER",
  GAME_START: "GAME_START",
  GAME_END: "GAME_END",
  GAME_CHANGE: "GAME_CHANGE",
} as const;

interface MessageDto {
  type: keyof typeof MESSAGE_TYPE;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export const decode = (message: IMessage): MessageDto => {
  const body = message.binaryBody;
  const decoder = new TextDecoder("utf-8");
  const jsonText = decoder.decode(body);

  return JSON.parse(jsonText);
};
