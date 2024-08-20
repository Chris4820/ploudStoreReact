import { z } from 'zod';

// Definindo o esquema Zod
const createProductSchema = z.object({
    name: z.string().min(3, "Mínimo de 3 caracteres"),
    description: z.string().min(6, 'Mínimo de 6 caracteres'),
    categoryId: z.number(),
    price: z.number(),
    imageUrl: z.any().optional(),  // Changed from string to any to accept File
    visible: z.boolean(),
});

// Exportando o tipo inferido
export type CreateProductFormData = z.infer<typeof createProductSchema>;
export default createProductSchema;
