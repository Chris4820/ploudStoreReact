import { z } from 'zod';

// Definindo o esquema Zod
const CustomPageSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, "Mínimo de 3 caracteres"),
  slug: z.string()
  .optional()
  .or(z.string().min(3, "Mínimo de 3 caracteres").regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hifens")),
  content: z.string().min(10, 'Minimo de 10 caracteres'),
  menuName: z.string().min(3, 'Mínimo de 3 caracters'),
  isShowMenu: z.boolean(),
  isActive: z.boolean(),
  includeCategories: z.boolean(),
  includeModules: z.boolean(),
});

// Exportando o tipo inferido
export type CustomPageFormData = z.infer<typeof CustomPageSchema>;
export default CustomPageSchema;
