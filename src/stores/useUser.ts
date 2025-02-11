import { create } from "zustand";

type State = {
  currentUser: string;
};

type Action = {
  loginUser: (firstName: State["currentUser"]) => void;
  logoutUser: () => void;
};

const useUserStore = create<State & Action>((set) => ({
  currentUser: "",
  loginUser: (name) => set(() => ({ currentUser: name })),
  logoutUser: () => set(() => ({ currentUser: "" })),
}));

export default useUserStore;
