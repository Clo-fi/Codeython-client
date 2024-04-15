import { create } from 'zustand';

interface AuthState {
  isLogined: boolean;
}

interface AuthActions {
  setLogined: () => void;
  setLogout: () => void;
}

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isLogined: false,

  setLogined: () => set({ isLogined: true }),
  setLogout: () => set({ isLogined: false }),
}));

export default useAuthStore;
