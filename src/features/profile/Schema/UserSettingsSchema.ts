import { z } from 'zod';

// Definindo o esquema Zod para domínio próprio
const UserSettingsSchema = z.object({
  name: z.string().min(5, "Mínimo de 5 caracteres"),
  language: z.string(),
  locale: z.string(),
  timezone: z.string(),
});

// Exportando o tipo inferido
export type UserSettingsFormData = z.infer<typeof UserSettingsSchema>;
export default UserSettingsSchema;
