import { z } from 'zod';

// Definindo o esquema Zod para domínio próprio
const UserSettingsSchema = z.object({
  language: z.string(),
  locale: z.string().default('pt-PT'),
  timezone: z.string(),
});

// Exportando o tipo inferido
export type UserSettingsFormData = z.infer<typeof UserSettingsSchema>;
export default UserSettingsSchema;
