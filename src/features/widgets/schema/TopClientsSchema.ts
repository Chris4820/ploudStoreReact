import { z } from 'zod';

// Definindo o esquema Zod
// Esquema de validação usando Zod
const TopClientsWidgetSchema = z.object({
  header: z.string().min(3,"O cabeçalho é obrigatório"),
  description: z.string().optional(),
  visible: z.boolean(),
  position: z.enum(['right', 'left']),
  config: z.object({
    clientsCount: z.number().min(3, "Mínimo é 3").max(5, "Máximo é 5"),
    period: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
    showValue: z.boolean(),
  }),
  startAt: z.string().datetime({precision: 3}).optional(),
  expireAt: z.string().datetime({precision: 3}).nullable(),
});

// Exportando o tipo inferido
export type TopClientsWidgetFormData = z.infer<typeof TopClientsWidgetSchema>;
export default TopClientsWidgetSchema;
