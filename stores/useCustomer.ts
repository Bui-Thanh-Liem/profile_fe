import { create } from "zustand";

type State = {
  currentCustomer: string;
};

type Action = {
  loginCustomer: (firstName: State["currentCustomer"]) => void;
  logoutCustomer: () => void;
};

const useCustomerStore = create<State & Action>((set) => ({
  currentCustomer: "",
  loginCustomer: (name) => set(() => ({ currentCustomer: name })),
  logoutCustomer: () => set(() => ({ currentCustomer: "" })),
}));

export default useCustomerStore;
