import { format, parseISO, type Locale } from "date-fns";
import { enUS, pt, ptBR } from "date-fns/locale";
import { useStore } from "../provider/Store/StoreContext";



export function FormatDateTime(dateTime: Date): string  {
  const store = useStore();
  const formatDate = Intl.DateTimeFormat(store.locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: store.timezone, // Isto é crucial para exibir a hora correta
  }).format(new Date(dateTime));
  return formatDate;
}


export function FormatMoney(price: number) : string {
  const store = useStore();
  const finalPrice = (price / 100);
  if(store && store.locale && store.currency) {
    const formated = Intl.NumberFormat(store.locale, {
      style: 'currency',
      currency: store.currency.toUpperCase()
    })
    //Converter de centimos para euros
    return formated.format(finalPrice);
  }
  return finalPrice.toFixed(2);
}


// Mapeamento entre a string do locale e o objeto de locale do date-fns
const localeMapping: Record<string, Locale> = {
  "pt-PT": pt,
  "pt-BR": ptBR,
  "en-US": enUS,
  // adiciona outros conforme necessário
};


export function FormatDate(dateFormat: string) {
  const store = useStore();
  const formatDate = (dateString: string): string => {
    try {
      const date = parseISO(dateString);
      const localeKey = store?.locale || "pt-PT";
      const locale = localeMapping[localeKey] || pt;
      return format(date, dateFormat, { locale });
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return dateString;
    }
  };
  return formatDate;
}



export function CalculeDaysLeft(date: string) : number | null {
  if(!date) {
    return null;
  }

  const currentDate = new Date();
  const overdueDate = new Date(date);
  // Calculate the difference in milliseconds
  const timeDiff = overdueDate.getTime() - currentDate.getTime(); // Convert Date to milliseconds
      
  // Calculate the difference in days
  const diffInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return diffInDays;
}



export function getPlanStatusColor(date: string) {
  const daysLeft = CalculeDaysLeft(date);
  if (daysLeft === null || daysLeft <= 0) return "text-destructive"; // Vermelho (expirado)
  if (daysLeft <= 3) return "text-yellow-500"; // Amarelo (3 dias ou menos)
  return "text-green-500"; // Verde (mais de 3 dias restantes)
}