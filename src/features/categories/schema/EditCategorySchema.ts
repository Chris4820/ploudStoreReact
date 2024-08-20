import { z } from 'zod';

// Definindo o esquema Zod
const editCategorySchema = z.object({
  name: z.string().min(3, "Mínimo de 3 caracteres"),
  description: z.string().min(6, 'Mínimo de 6 caracteres'),
  categoryId: z.number(),
  slug: z.string().min(3, "Minimo de 3 caracters").regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hifens"),
  visible: z.boolean().default(true),
});

// Exportando o tipo inferido
export type EditCategoryFormData = z.infer<typeof editCategorySchema>;
export default editCategorySchema;
