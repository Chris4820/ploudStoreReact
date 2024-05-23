import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";
import { pt, enUS } from "date-fns/locale";
import { useGetUserInformation } from "../api/store/user";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: any) {
  console.log("Chamado a função de conversao")
  const { data: user } = useGetUserInformation();
  let locale; // Locale padrão caso não seja obtido do store

  if (user && user.language) {
    // Definir o locale com base no código de idioma do store
    switch (user.language) {
      case 'us':
        locale = enUS;
        break;
      case 'pt':
        locale = pt;
        break;
      default:
        locale = pt; // Locale padrão
    }
  }
  // Formatar a data com o locale especificado
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy', { locale });
}




//Cookies
const AUTH_COOKIE_NAME = "authToken"; 

export async function getAuthTokenFromCookie() {
    return Cookies.get(AUTH_COOKIE_NAME) || null;
}
export async function createAuthToken(token: string) {
  if(await getAuthTokenFromCookie()) {
    console.log("Removeu")
    await removeAuthCookie();
  }
  Cookies.set(AUTH_COOKIE_NAME, token, { expires: 7 })
}
export async function removeAuthCookie() {
  Cookies.remove(STORE_COOKIE_NAME);
}

const STORE_COOKIE_NAME = "storeToken";

export async function getStoreTokenFromCookie() {
  return Cookies.get(STORE_COOKIE_NAME) || null;
}

export async function createStoreToken(token: string) {
  Cookies.set(STORE_COOKIE_NAME, token, { expires: 7 })
}

export async function removeStoreCookie() {
  Cookies.remove(STORE_COOKIE_NAME);
}
