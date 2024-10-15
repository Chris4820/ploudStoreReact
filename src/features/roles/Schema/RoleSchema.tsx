import { z } from 'zod';

// Definindo o esquema Zod para domínio próprio
const RoleSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  permissions: z.array(z.string()), // Garante que seja um array de strings.
});

// Exportando o tipo inferido
export type RoleFormData = z.infer<typeof RoleSchema>;
export default RoleSchema;
