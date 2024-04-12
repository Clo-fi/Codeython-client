import { create } from "zustand";

interface UserState {
  level: number;
  nickname: string;
  exp: number;
}

interface UserAction {
  setUserInfo: (userInfo: UserState) => void;
}

const useUserStore = create<UserState & UserAction>((set) => ({
  nickname: "",
  exp: 0,
  level: 0,
  setUserInfo: ({ nickname, exp }) => set({ nickname, exp }),
}));

export default useUserStore;
