import { create } from "zustand";
import { getUserInfo } from "../api/user/user";

interface UserState {
  level: number;
  nickname: string;
  exp: number;
}

interface UserAction {
  setUserInfo: () => void;
}

const useUserStore = create<UserState & UserAction>((set) => ({
  nickname: "",
  exp: 0,
  level: 0,
  setUserInfo: async () => {
    return getUserInfo().then(({ nickname, level, exp }) => {
      set({ nickname, exp, level });
    });
  },
}));

export default useUserStore;
