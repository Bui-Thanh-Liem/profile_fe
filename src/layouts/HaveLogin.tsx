"use client";
//

//
import Notification from "@/components/Notification";
import Profile from "@/components/Profile";
import useCustomerStore from "../../stores/useCustomer";

//
export default function HaveLogin() {
  const { currentCustomer } = useCustomerStore();

  if (!currentCustomer) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6 fixed top-28 right-24">
      <Profile />
      <Notification />
    </div>
  );
}
