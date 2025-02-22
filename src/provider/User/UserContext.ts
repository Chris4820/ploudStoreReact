import { createContext, useContext } from "react";
import type { UserInformationProps } from "../../globaldata/httpglobal";



export const UserContext = createContext<UserInformationProps | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
}
