import instance from "../axios";
import { PostEnterRoomResponse } from "./dto";

export const postEnterRoom = async (
  roomId: string,
  password?: string
): Promise<PostEnterRoomResponse> => {
  const { data } = await instance.post(`rooms/${roomId}`, {
    password: password ?? null,
  });
  return data;
};
