import { z } from 'zod';



// Define o esquema para os metadados do arquivo

// Definindo o esquema Zod
const PagSeguroSchema = z.object({
  // Validação para o Client ID: 32 caracteres alfanuméricos (com prefixo opcional)
  config: z.object({
    email: z.string()
      .email("Email inválido"), // O email deve ser válido
    secretKey: z.string()
      .min(32, "O token de integração deve ter no mínimo 32 caracteres") // O token de integração deve ter no mínimo 32 caracteres
      .max(32, "O token de integração deve ter no máximo 32 caracteres")
  }),
  active: z.boolean(),
  taxType: z.enum(['PERCENTAGE', 'VALUE', 'NONE']),
  taxValue: z.number().min(0, "0 ou Acima")
});

// Exportando o tipo inferido
export type PagSeguroFormData = z.infer<typeof PagSeguroSchema>;
export default PagSeguroSchema;
