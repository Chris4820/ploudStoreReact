import { z } from 'zod';

// Definindo o esquema Zod para domínio próprio
const ServerSchema = z.object({
  name: z.string(),
});

// Exportando o tipo inferido
export type ServerFormData = z.infer<typeof ServerSchema>;
export default ServerSchema;
