import { IUser } from "@/interfaces/model.interface";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type State = {
  currentUser: Partial<IUser> | null;
  isAuthenticated: boolean;
};

type Action = {
  loginUser: (userLogin: Partial<IUser>) => void;
  logoutUser: () => void;
};

const persistConfig: PersistOptions<State & Action> = {
  name: "auth-storage",
};

export const useCustomerStore = create<State & Action>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      loginUser: (userLogin) =>
        set(() => ({ currentUser: userLogin, isAuthenticated: true })),
      logoutUser: () =>
        set(() => ({ currentUser: null, isAuthenticated: false })),
    }),
    persistConfig
  )
);

export default useCustomerStore;
