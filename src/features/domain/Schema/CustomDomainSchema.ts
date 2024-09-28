import { z } from 'zod';

// Definindo o esquema Zod para domínio próprio
const CustomDomainSchema = z.object({
  domain: z.string()
    .min(5, "O domínio deve ter no mínimo 5 caracteres.") // Por exemplo, 'a.com' não é permitido
    .max(253, "O domínio deve ter no máximo 253 caracteres.")
    .regex(
      /^(?!-)[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.[A-Za-z]{2,}(\.[A-Za-z]{2,})?$/,
      "O domínio deve ser válido e seguir a estrutura correta (exemplo.com ou loja.exemplo.com)."
    ),
});

// Exportando o tipo inferido
export type CustomDomainFormData = z.infer<typeof CustomDomainSchema>;
export default CustomDomainSchema;
