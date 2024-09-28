import { z } from 'zod';

// Definindo o esquema Zod
// Esquema de validação usando Zod
const CouponSchema = z.object({
  id: z.number().optional(),
  code: z.string({ required_error: "O código coupom é obrigatório"}).min(3,"O código do cupom é obrigatório"),
  limit: z.preprocess((val) => parseFloat(val as string), z.number().min(0, "O limite deve ser um numero positivo")),
  type: z.enum(["PERCENTAGE", "VALUE"]),
  value: z.preprocess((val) => parseFloat(val as string), z.number().positive("O valor deve ser um número positivo")),
  minValue: z.preprocess((val) => parseFloat(val as string), z.number().min(0, "O valor minimo deve ser um número positivo")),
  start_at: z.string().datetime({precision: 3}).nullable(),
  expire_at: z.string().datetime({precision: 3}).nullable(),
  isUsableInAllStores: z.boolean(),
  productIds: z.array(z.number()).optional(),
}).refine((data) => {
  if (!data.isUsableInAllStores && (!data.productIds || data.productIds.length === 0)) {
    return false;
  }
  return true;
}, {
  path: ['productIds'],
  message: "Selecione pelo menos 1 produto",
});

// Exportando o tipo inferido
export type CouponFormData = z.infer<typeof CouponSchema>;
export default CouponSchema;
