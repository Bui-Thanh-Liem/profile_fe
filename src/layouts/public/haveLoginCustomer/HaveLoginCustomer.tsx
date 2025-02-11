"use client";
//

//
import NotificationCustomer from "@/layouts/public/haveLoginCustomer/NotificationCustomer";
import PersonalCustomer from "@/layouts/public/haveLoginCustomer/PersonalCustomer";
import useCustomerStore from "../../../stores/useCustomer";

//
export default function HaveLogin() {
  const { currentCustomer } = useCustomerStore();

  if (!currentCustomer) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6 fixed top-28 right-24">
      <PersonalCustomer />
      <NotificationCustomer />
    </div>
  );
}
