// src/layouts/DashboardStoreWrapper.tsx
import { Outlet } from "react-router-dom";
import { StoreProvider } from "./StoreProvider.tsx";

export default function StoreProviderWrapper() {
  return (
    <StoreProvider>
      <Outlet />
    </StoreProvider>
  );
}
