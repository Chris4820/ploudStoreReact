import { z } from 'zod';

// Definindo o esquema para as opções das variáveis
const variableOptionSchema = z.object({
  name: z.string().min(1, "O nome da opção é obrigatório."),
  value: z.string().min(1, "O valor da opção é obrigatório."),
  tax: z.number().min(0, "A taxa precisa ser 0 ou maior"),
  isDefault: z.boolean().optional() // Este campo é opcional
});

// Definindo o esquema para a variável com o campo 'options'
const variableSchema = z.object({
  slug: z.string()
    .min(1, "O identificador é obrigatório.")
    .regex(/^[a-zA-Z0-9-_]+$/, "O identificador pode conter apenas letras, números, hífens e sublinhados."), // Validação para o slug
  title: z.string().min(1, "O título é obrigatório."),
  options: z.array(variableOptionSchema).min(2, "Deve haver pelo menos duas opções.") // Alterado para 'options', conforme novo modelo
});

// Exportando o tipo inferido
export type VariableFormData = z.infer<typeof variableSchema>;
export default variableSchema;
