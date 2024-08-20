


import { z } from 'zod';

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z
  .string()
  .min(6, "A senha deve ter no mínimo 6 caracteres")
  .regex(/[@#$%&*!?.]/, "A senha deve conter pelo menos 1 caractere especial")
  .regex(/[A-Z]/, "A senha deve conter pelo menos 1 letra maiúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos 1 número"),
  confirmPassword: z.string(),
  }).refine(({password, confirmPassword}) => password === confirmPassword, {
      message: "As senhas não coicidem",
      path:['confirmPassword']
})

// Exportando o tipo inferido
export type resetPasswordSchemaFormData = z.infer<typeof resetPasswordSchema>;
export default resetPasswordSchema;
