import { z } from 'zod';



// Define o esquema para os metadados do arquivo
const FileMetadataSchema = z.object({
    size: z.number().positive("O tamanho deve ser positivo"),
    type: z.string().min(1, "O tipo deve ser uma string não vazia")
  }).nullable().default(null);


// Definindo o esquema Zod
const ProductSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(3, "Mínimo de 3 caracteres"),
    description: z.string().min(6, 'Mínimo de 6 caracteres'),
    price: z.preprocess((val) => parseFloat(val as string), z.number().positive("O preço deve ser um número positivo")),
    stock: z.preprocess((val) => parseFloat(val as string), z.number()),
    categoryId: z.number().optional(),
    imageUrl: z.string().nullable(),
    hasChangeImage: z.boolean().default(false),
    newImage: FileMetadataSchema,
    visible: z.boolean(),
    expire_days: z.preprocess((val) => parseFloat(val as string), z.number().min(0, "No minimo 0")),
    commands: z.array(z.object( {
      command: z.string().min(3, "O comando é obrigatório"),
      type: z.enum(['EXPIRE', 'PURCHASE']),
      offline_execute: z.boolean(),
    })), // Corrigido para aceitar um array de strings
});

// Exportando o tipo inferido
export type ProductFormData = z.infer<typeof ProductSchema>;
export default ProductSchema;
