import { IMessage } from "@stomp/stompjs";

export const decode = (message: IMessage) => {
  const body = message.binaryBody;
  const decoder = new TextDecoder("utf-8");
  const jsonText = decoder.decode(body);

  return JSON.parse(jsonText);
};
