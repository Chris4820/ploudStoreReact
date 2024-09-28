import { z } from 'zod';



// Define o esquema para os metadados do arquivo

// Definindo o esquema Zod
const MollieSchema = z.object({
  // Validação para o Client ID: 32 caracteres alfanuméricos (com prefixo opcional)
  config: z.object({
    key: z.string().min(32, "Minimo de 32"),  // O email deve ser válido
  }),
  active: z.boolean(),
  taxType: z.enum(['PERCENTAGE', 'VALUE', 'NONE']),
  taxValue: z.number().min(0, "0 ou Acima")
});

// Exportando o tipo inferido
export type MollieFormData = z.infer<typeof MollieSchema>;
export default MollieSchema;
