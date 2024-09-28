import { z } from 'zod';

// Definindo o esquema Zod
// Esquema de validação usando Zod
const RecentPaymentsWidgetSchema = z.object({
  header: z.string().min(3,"O cabeçalho é obrigatório"),
  description: z.string().optional(),
  visible: z.boolean(),
  position: z.enum(['right', 'left']),
  config: z.object({
    clientsCount: z.number().min(3, "Mínimo é 3").max(5, "Máximo é 5"),
    showDate: z.boolean(),
    showValue: z.boolean(),
  }),
  startAt: z.string().datetime({precision: 3}).optional(),
  expireAt: z.string().datetime({precision: 3}).nullable(),
});

// Exportando o tipo inferido
export type RecentPaymentsWidgetFormData = z.infer<typeof RecentPaymentsWidgetSchema>;
export default RecentPaymentsWidgetSchema;
