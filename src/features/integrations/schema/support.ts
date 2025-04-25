import { z } from "zod";



export const TawkSchema = z.object({
  type: z.literal("TAWK"),
  isActive: z.boolean(),
  config: z.object({
    propertyId: z.string().min(1, "Property ID é obrigatório"),
    widgetId: z.string().min(1, "Widget ID é obrigatório"),
  }),
});

  // Exportando o tipo inferido
  export type TawkSchemaFormData = z.infer<typeof TawkSchema>;

export const CrispSchema = z.object({
  type: z.literal("CRISP"),
  isActive: z.boolean(),
  config: z.object({
    websiteId: z.string().regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      "Website ID inválido. Deve ser um UUID válido",
    ),
  }),
});

// Exportando o tipo inferido
export type CrispSchemaFormData = z.infer<typeof CrispSchema>;
