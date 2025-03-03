"use client";
import useAuthStore from "@/stores/useAuthStore";
import { Avatar } from "antd";

export function HeaderAdmin() {
  const { currentUser } = useAuthStore();
  console.log("currentUser:::", currentUser);

  return (
    <>
      <h2 className="leading-none m-0 text-xl font-bold">Analytics</h2>
      <div className="flex items-center gap-6">
        <div>
          <p className="leading-none font-bold text-lg mb-1">
            {currentUser?.fullName}
          </p>
          <p className="leading-none text-gray-app">{currentUser?.email}</p>
        </div>
        <Avatar
          size={42}
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
          alt=""
        />
      </div>
    </>
  );
}
