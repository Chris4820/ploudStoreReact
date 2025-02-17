import type { SettingsFormData } from "../features/settings/schema/SettingsSchema";






export function formatMoney(price: number, store: SettingsFormData | undefined) {
  const finalPrice = (price / 100);
  if(store?.StoreSettings && store.StoreSettings.locale && store.StoreSettings.currency) {
    const formated = Intl.NumberFormat(store.StoreSettings.locale, {
      style: 'currency',
      currency: store.StoreSettings.currency.toUpperCase()
    })
    //Converter de centimos para euros
    return formated.format(finalPrice);
  }
  return finalPrice;
}