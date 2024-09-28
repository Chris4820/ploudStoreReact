import { z } from 'zod';

// Definindo o esquema Zod
// Esquema de validação usando Zod
const GoalWidgetSchema = z.object({
  header: z.string().min(3,"O cabeçalho é obrigatório"),
  description: z.string().optional(),
  visible: z.boolean(),
  position: z.enum(['right', 'left']),
  config: z.object({
    goal: z.number({required_error: 'A meta é obrigatória'}).positive("A meta é inválido!"),
    barType: z.enum(["FULL", "DASHED"]),
    progressDisplayType: z.enum(["PERCENTAGE", "VALUE", "BOTH"]), // Tipo de exibição do progresso
  }),
  startAt: z.string().datetime({precision: 3}).optional(),
  expireAt: z.string().datetime({precision: 3}).nullable(),
});

// Exportando o tipo inferido
export type GoalWidgetFormData = z.infer<typeof GoalWidgetSchema>;
export default GoalWidgetSchema;
