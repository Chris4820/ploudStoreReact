// src/layouts/DashboardStoreWrapper.tsx
import { Outlet } from "react-router-dom";
import { UserProvider } from "./UserProvider";

export default function UserProviderWrapper() {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
}
