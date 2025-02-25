import { IUser } from "@/interfaces/model.interface";
import { create } from "zustand";

type State = {
  currentUser: Partial<IUser> | null;
};

type Action = {
  loginUser: (userLogin: Partial<IUser>) => void;
  logoutUser: () => void;
};

const useUserStore = create<State & Action>((set) => ({
  currentUser: null,
  loginUser: (userLogin) => set(() => ({ currentUser: userLogin })),
  logoutUser: () => set(() => ({ currentUser: null })),
}));

export default useUserStore;
