import { z } from 'zod';

// Definindo o esquema para as opções das variáveis
const designSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
});

// Exportando o tipo inferido
export type designFormData = z.infer<typeof designSchema>;
export default designSchema;
