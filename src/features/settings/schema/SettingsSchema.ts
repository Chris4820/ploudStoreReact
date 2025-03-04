import { z } from 'zod';




// Definindo o esquema Zod
const settingsSchema = z.object({
  name: z.string().min(3, "O nome precisa ter no mínimo 3 caracters"),
  description: z.string(),
  keywords: z.string(),
  terms: z.string(),
  currency: z.string().default('eur'),
  locale: z.string().default('pt-PT'),
  timezone: z.string(),
  maintenance: z.boolean(),
  minBasket: z.preprocess((val) => parseFloat(val as string), z.number().min(0, "0 é o valor minimo do carrinho")),
  
})

// Exportando o tipo inferido
export type SettingsFormData = z.infer<typeof settingsSchema>;
export default settingsSchema;
