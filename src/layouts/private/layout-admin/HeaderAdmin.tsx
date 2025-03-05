"use client";
import { MyAvatar } from "@/components/MyAvatar";
import useAuthStore from "@/stores/useAuthStore";

export function HeaderAdmin() {
  const { currentUser } = useAuthStore();

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
        <MyAvatar
          src={currentUser?.avatar || ""}
          alt={currentUser?.fullName || ""}
          fallbackText={currentUser?.fullName || ""}
        />
      </div>
    </>
  );
}
