import { createContext, useContext } from "react";
import type { StoreInformationProps } from "../../features/stores/api/req/store";



export const StoreContext = createContext<StoreInformationProps | null>(null);

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
}
