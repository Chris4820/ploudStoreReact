import { z } from 'zod';

// Define schema for file metadata
const FileMetadataSchema = z.object({
  size: z.number().positive("O tamanho deve ser positivo"),
  type: z.string().min(1, "O tipo deve ser uma string não vazia")
}).nullable().default(null);


// Command schema for reusability
const CommandSchema = z.object({
  command: z.string().min(3, "O comando é obrigatório"),
  server: z.object({
    id: z.number({required_error: 'Servidor é obrigatório'}).positive("Servidor é obrigatório"),
    name: z.string().optional(),
  }, {message: "Servidor inválido"}),
  type: z.enum(['EXPIRE', 'PURCHASE'], {
    errorMap: () => ({ message: "Tipo de comando inválido" })
  }),
  offline_execute: z.boolean().default(false),
});

// Main product schema
const ProductSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "Mínimo de 3 caracteres").max(100, "Máximo de 100 caracteres"),
  description: z.string().min(6, 'Mínimo de 6 caracteres'),
  price: z.string().min(1, "O preço é obrigatório"),
  oldPrice: z.string().optional(),
  categoryId: z.number().optional(),
  imageUrl: z.string().nullable().default(null),
  hasChangeImage: z.boolean().default(false),
  newImage: FileMetadataSchema,
  stockEnable: z.boolean().default(false),
  quantityEnable: z.boolean().default(true),
  expireEnable: z.boolean().default(false),
  stock: z.preprocess(
    (val) => {
      if (val === undefined || val === null || val === "") return 0;
      const num = typeof val === "string" ? parseFloat(val as string) : Number(val);
      return isNaN(num) ? 0 : Math.max(0, Math.round(num));
    }, 
    z.number().nonnegative("Estoque não pode ser negativo")
  ),
  visible: z.boolean().default(true),
  expireAt: z.string().nullable().default(null),
  ProductCommands: z.array(CommandSchema).min(1, "Pelo menos um comando é necessário"),
});

// Export the inferred type
export type ProductFormData = z.infer<typeof ProductSchema>;
export default ProductSchema;
