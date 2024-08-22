import { z } from 'zod';

// Definindo o esquema Zod
// Esquema de validação usando Zod
const createCouponSchema = z.object({
  code: z.string().min(3,"O código do cupom é obrigatório"),
  limit: z.preprocess((val) => parseFloat(val as string), z.number().min(0, "O limite deve ser um numero positivo")),
  type: z.enum(["percentage", "value"]),
  value: z.preprocess((val) => parseFloat(val as string), z.number().positive("O valor deve ser um número positivo")),
  minValue: z.preprocess((val) => parseFloat(val as string), z.number().min(0, "O valor minimo deve ser um número positivo")),
  start_at: z.string().datetime({precision: 3}).nullable(),
  expire_at: z.string().datetime({precision: 3}).nullable(),
  isUsableInAllStores: z.boolean(),
  productIds: z.array(z.number()).optional(),
}).refine((data) => {
  if (!data.isUsableInAllStores && (!data.selectedProducts || data.selectedProducts.length === 0)) {
    return false;
  }
  return true;
}, {
  path: ['selectedProducts'],
  message: "Selecione pelo menos 1 produto",
});

// Exportando o tipo inferido
export type CreateCouponFormData = z.infer<typeof createCouponSchema>;
export default createCouponSchema;
