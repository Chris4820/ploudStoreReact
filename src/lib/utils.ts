import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";
import { pt, enUS } from "date-fns/locale";
import { useGetUserInformation } from "../api/store/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(dateString: string) {
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
