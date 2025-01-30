import { create } from "zustand";

type State = {
  currentCustomer: string;
};

type Action = {
  login: (firstName: State["currentCustomer"]) => void;
  logout: () => void;
};

const useCustomerStore = create<State & Action>((set) => ({
  currentCustomer: "",
  login: (name) => set(() => ({ currentCustomer: name })),
  logout: () => set(() => ({ currentCustomer: "" })),
}));

export default useCustomerStore;
