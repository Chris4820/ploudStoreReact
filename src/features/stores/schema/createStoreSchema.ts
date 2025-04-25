import { z } from 'zod';

export enum StorePlansEnum {
  basic = 'basic',
  standard = 'standard',
  premium = 'premium',
}


// Definindo o esquema Zod
const createStoreSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().min(10, 'Descrição com pelo menos 10 letras'),
  subDomain: z.string().min(3, "Insira pelo menos 3 caracteres")
          .regex(/^[a-zA-Z0-9-_]+$/, "O subdomínio deve conter apenas letras, números, hífens e sublinhados"),
  currency: z.string().default('eur'),
  gameType: z.enum(['MINECRAFT', 'FIVEM', 'REDDEAD']),
  plan: z.nativeEnum(StorePlansEnum),
})

// Exportando o tipo inferido
export type CreateStoreFormData = z.infer<typeof createStoreSchema>;
export default createStoreSchema;
