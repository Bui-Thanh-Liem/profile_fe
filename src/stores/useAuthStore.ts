import { IUser } from "@/interfaces/model.interface";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type State = {
  currentUser: Partial<IUser> | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

type Action = {
  loginUser: (userLogin: Partial<IUser>) => void;
  logoutUser: () => void;
};

const persistConfig: PersistOptions<State & Action> = {
  name: "auth-storage",
};

export const useAuthStore = create<State & Action>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      isAdmin: false,
      loginUser: (userLogin) =>
        set(() => ({
          currentUser: userLogin,
          isAuthenticated: true,
          isAdmin: userLogin.isAdmin || userLogin.isSubAdmin,
        })),
      logoutUser: () =>
        set(() => ({
          currentUser: null,
          isAuthenticated: false,
          isAdmin: false,
        })),
    }),
    persistConfig
  )
);

export default useAuthStore;
