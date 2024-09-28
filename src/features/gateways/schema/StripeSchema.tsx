import { z } from 'zod';

// Define o esquema para os metadados do arquivo

// Definindo o esquema Zod
const StripeSchema = z.object({
  // Validação para o Client ID: 32 caracteres alfanuméricos (com prefixo opcional)
  config: z.object({
    secretKey: z.string()
    .min(32, "Token ID deve ter pelo menos 32 caracteres.")
    .max(64, "Token ID não pode exceder 64 caracteres.")
    .regex(/^[A-Za-z0-9-_]+$/, "Token ID deve conter apenas caracteres alfanuméricos, hífens ou underscores."),
  }),
  active: z.boolean(),
  taxType: z.enum(['PERCENTAGE', 'VALUE', 'NONE']),
  taxValue: z.number().min(0, "0 ou Acima")
});

// Exportando o tipo inferido
export type StripeFormData = z.infer<typeof StripeSchema>;
export default StripeSchema;
