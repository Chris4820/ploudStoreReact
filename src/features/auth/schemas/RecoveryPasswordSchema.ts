


import { z } from 'zod';

const recoveryPasswordSchema = z.object({
  email: z.string().min(1, "Campo obrigatório").email('Formato email errado'),
})

// Exportando o tipo inferido
export type recoveryPasswordSchemaFormData = z.infer<typeof recoveryPasswordSchema>;
export default recoveryPasswordSchema;
