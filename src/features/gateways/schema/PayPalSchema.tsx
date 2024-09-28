import { z } from 'zod';



// Define o esquema para os metadados do arquivo

// Definindo o esquema Zod
const PaypalSchema = z.object({
  // Validação para o Client ID: 32 caracteres alfanuméricos (com prefixo opcional)
  config: z.object({
    email: z.string().email("Email inválido"),  // O email deve ser válido
  }),
  active: z.boolean(),
  taxType: z.enum(['PERCENTAGE', 'VALUE', 'NONE']),
  taxValue: z.number().min(0, "0 ou Acima")
});

// Exportando o tipo inferido
export type PaypalFormData = z.infer<typeof PaypalSchema>;
export default PaypalSchema;
