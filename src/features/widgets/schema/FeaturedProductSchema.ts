import { z } from 'zod';

// Definindo o esquema Zod
// Esquema de validação usando Zod
const FeaturedProductWidgetSchema = z.object({
  header: z.string().min(3,"O cabeçalho é obrigatório"),
  description: z.string().optional(),
  visible: z.boolean(),
  position: z.enum(['right', 'left']),
  config: z.object({
    product: z.number({required_error: 'O produto é obrigatória'}).positive("O produto é inválido!"),
  }),
  startAt: z.string().datetime({precision: 3}).optional(),
  expireAt: z.string().datetime({precision: 3}).nullable(),
});

// Exportando o tipo inferido
export type FeaturedProductWidgetFormData = z.infer<typeof FeaturedProductWidgetSchema>;
export default FeaturedProductWidgetSchema;
