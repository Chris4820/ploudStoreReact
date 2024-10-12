import { z } from 'zod';

// Definindo o esquema Zod
// Esquema de validação usando Zod
const SubUserSchema = z.object({
  email: z.string().email("E-mail inválido"),
  role: z.number({required_error: 'A meta é obrigatória'}).positive("A meta é inválido!"),
});

// Exportando o tipo inferido
export type SubUserFormData = z.infer<typeof SubUserSchema>;
export default SubUserSchema;
