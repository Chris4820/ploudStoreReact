


import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().min(3, "O email precisa ter pelo menos 3 caracteres").email('Formato email errado'),
  password: z.string().min(6, 'A senha precisa ter 6 caracteres'),
  remember: z.boolean()
})

// Exportando o tipo inferido
export type loginSchemaFormData = z.infer<typeof loginSchema>;
export default loginSchema;
