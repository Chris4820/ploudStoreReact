import { type StoreInformationProps } from "../features/stores/api/req/store";






export function formatMoney(price: number, store: StoreInformationProps | undefined) {
  const finalPrice = (price / 100);
  if(store && store.locale && store.currency) {
    const formated = Intl.NumberFormat(store.locale, {
      style: 'currency',
      currency: store.currency.toUpperCase()
    })
    //Converter de centimos para euros
    return formated.format(finalPrice);
  }
  return finalPrice;
}