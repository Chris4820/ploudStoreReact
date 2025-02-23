import { ReactNode } from "react";
import { UserProvider } from "./UserProvider";

interface UserProviderWrapperProps {
  children: ReactNode;
}

export default function UserProviderWrapper({ children }: UserProviderWrapperProps) {
  return <UserProvider>{children}</UserProvider>;
}
