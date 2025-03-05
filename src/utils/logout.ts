import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import queryClient from "../lib/reactquery/reactquery";



export function logout() {
  // Simples função sem hook
  queryClient.invalidateQueries({ queryKey: ["user"] });
  Cookies.remove("authToken", { path: "/" });
  window.location.href = "/auth/login";
}

// OU se preferires mesmo um hook:
export function useLogout() {
  const navigate = useNavigate();

  return async () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
    Cookies.remove("authToken", { path: "/" });
    navigate("/auth/login", { replace: true });
  };
}
