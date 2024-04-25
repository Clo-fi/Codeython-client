import React, { useEffect } from "react";
import { create } from "zustand";

import { useNavigate } from "react-router-dom";
import styles from "./RoomListForm.module.scss";
import instance from "../../../api/axios";
import { CustomAlert } from "../../../libs/sweetAlert/alert";

interface Room {
  roomId: number;
  roomName: string;
  problemTitle: string;
  limitMemberCnt: number;
  playMemberCnt: number;
  isSecret: boolean;
  isSoloplay: boolean;
}

interface RoomListStore {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  fetchRooms: () => Promise<void>;
}

export const useRoomListStore = create<RoomListStore>((set) => ({
  rooms: [],
  loading: false,
  error: null,
  fetchRooms: async () => {
    set({ loading: true, error: null });
    try {
      const response = await instance.get<Room[]>("/rooms");
      set({ rooms: response.data, loading: false });
    } catch (error) {
      set({
        rooms: [],
        loading: false,
        error: "방 목록을 불러오는 데 실패했습니다.",
      });
    }
  },
}));

const RoomListForm: React.FC = () => {
  const navigate = useNavigate();
  const { rooms, loading, error, fetchRooms } = useRoomListStore();

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleRoomSelect = (room: Room) => async () => {
    if (room.isSecret) {
      const { value: password } = await CustomAlert.fire({
        title: "방 비밀번호 입력",
        input: "password",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      });

      if (password) {
        navigateToRoom(room.roomId, password);
      } else {
        return;
      }
    } else {
      navigateToRoom(room.roomId, null);
    }
  };

  const navigateToRoom = async (roomId: number, password: string | null) => {
    const payload = { password };
    try {
      const response = await instance.post(`/rooms/${roomId}`, payload);
      if (response.status === 200) {
        const {
          problemTitle,
          limitTime,
          difficulty,
          roomName,
          inviteCode,
          isSoloPlay,
          problemId,
          limitMemberCnt,
        } = response.data;

        const queryParams = new URLSearchParams({
          problemTitle,
          limitTime: limitTime.toString(),
          difficulty,
          roomName,
          inviteCode,
          isSoloPlay: isSoloPlay.toString(),
          roomId: roomId.toString(),
          problemId,
          limitMemberCnt,
        }).toString();

        navigate(`/waiting/${roomId}?${queryParams}`);
      }
    } catch (error) {
      CustomAlert.fire({
        icon: "error",
        title: "오류",
        text: "입장에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  if (loading) {
    return <div>로딩 중입니다...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={fetchRooms}>다시 시도하기</button>
      </div>
    );
  }

  return (
    <div className={styles.roomForm__container}>
      <div className={styles.roomForm_component__list}>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              className={styles.roomForm_component__element}
              key={room.roomId}
              onClick={handleRoomSelect(room)}
            >
              <div className={styles.roomForm_component__title}>
                {room.roomName} | {room.problemTitle}{" "}
                {room.isSecret ? (
                  <img src="Imgs/lock.png" className={styles.lock_icon}></img>
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.roomForm_component__soloOrnot}>
                {room.isSoloplay ? <span>팀전</span> : <span>개인전</span>}
              </div>
              <div className={styles.roomForm_component__member}>
                {" "}
                {room.playMemberCnt}/{room.limitMemberCnt}{" "}
              </div>
            </div>
          ))
        ) : (
          <div>No rooms available.</div>
        )}
      </div>
    </div>
  );
};

export default RoomListForm;
