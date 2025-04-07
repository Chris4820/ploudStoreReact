


import { z } from 'zod';

const registerSchema = z.object({
  token: z.string().optional(), //Captcha
  name: z.string().min(3, "O email precisa ter pelo menos 3 caracteres"),
  email: z.string().min(3, "O email precisa ter pelo menos 3 caracteres").email('Formato email errado'),
  password: z
  .string()
  .min(6, "A senha deve ter no mínimo 6 caracteres")
  .regex(/[@#$%&*!?.]/, "A senha deve conter pelo menos 1 caractere especial")
  .regex(/[A-Z]/, "A senha deve conter pelo menos 1 letra maiúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos 1 número"),
  confirmPassword: z.string(),
  terms: z.literal<boolean>(true, { errorMap: () => ({ message: "Você precisa aceitar os termos!", }), })
  }).refine(({password, confirmPassword}) => password === confirmPassword, {
      message: "As senhas não coicidem",
      path:['confirmPassword']
})

// Exportando o tipo inferido
export type registerSchemaFormData = z.infer<typeof registerSchema>;
export default registerSchema;
