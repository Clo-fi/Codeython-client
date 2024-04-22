import { create } from 'zustand';

interface ToggleState {
  isPeopleToggleActive: boolean;
  isChatToggleActive: boolean;
}

interface ToggleAction {
  handlePeopleToggle: () => void;
  handleChatToggle: () => void;
}

const useToggleStore = create<ToggleState & ToggleAction>((set) => ({
  isPeopleToggleActive: false,
  isChatToggleActive: false,
  handlePeopleToggle: () => set((state) => ({ isPeopleToggleActive: !state.isPeopleToggleActive, isChatToggleActive: false })),
  handleChatToggle: () => set((state) => ({ isChatToggleActive: !state.isChatToggleActive, isPeopleToggleActive: false })),
}));

export default useToggleStore;
