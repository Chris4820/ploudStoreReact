import { z } from 'zod';

// Definindo o esquema Zod
const ProductSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(3, "Mínimo de 3 caracteres"),
    description: z.string().min(6, 'Mínimo de 6 caracteres'),
    categoryId: z.number(),
    price: z.preprocess((val) => parseFloat(val as string), z.number().positive("O preço deve ser um número positivo")),
    imageUrl: z.any().optional(),  // Changed from string to any to accept File
    visible: z.boolean(),
});

// Exportando o tipo inferido
export type ProductFormData = z.infer<typeof ProductSchema>;
export default ProductSchema;
