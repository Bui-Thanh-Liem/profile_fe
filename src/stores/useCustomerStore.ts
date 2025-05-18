import { ICustomer, IUser } from "@/interfaces/model.interface";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type State = {
  currentCustomer: Partial<ICustomer> | null;
  isLoggedCustomer: boolean;
};

type Action = {
  loginCustomer: (userLogin: Partial<IUser>) => void;
  logoutCustomer: () => void;
};

const persistConfig: PersistOptions<State & Action> = {
  name: "customer-storage",
};

export const useCustomerStore = create<State & Action>()(
  persist(
    (set) => ({
      currentCustomer: null,
      isLoggedCustomer: false,
      loginCustomer: (userLogin) =>
        set(() => ({ currentCustomer: userLogin, isLoggedCustomer: true })),
      logoutCustomer: () =>
        set(() => ({ currentCustomer: null, isLoggedCustomer: false })),
    }),
    persistConfig
  )
);

export default useCustomerStore;
