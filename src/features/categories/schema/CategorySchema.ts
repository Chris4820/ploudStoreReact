import { z } from 'zod';

// Definindo o esquema Zod
const CategorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "Mínimo de 3 caracteres"),
  description: z.string().min(6, 'Mínimo de 6 caracteres'),
  parentId: z.number().optional().nullable(),
  slug: z.string().min(3, "Minimo de 3 caracters").regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hifens"),
  visible: z.boolean(),
});

// Exportando o tipo inferido
export type CategoryFormData = z.infer<typeof CategorySchema>;
export default CategorySchema;
