import { z } from 'zod';


// Definindo o esquema Zod
const BlogSchema = z.object({
    title: z.string().min(3, "Mínimo de 3 caracteres"),
    author: z.string().min(1, "Este campo é obrigatório"),
    content: z.string().min(1, "Este campo é obrigatório"),
    isVisible: z.boolean(),
});

// Exportando o tipo inferido
export type BlogFormData = z.infer<typeof BlogSchema>;
export default BlogSchema;
