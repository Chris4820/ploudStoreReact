import { z } from "zod";



export const GoogleAnalyticsSchema = z.object({
  type: z.literal("GA"),
  isActive: z.boolean(),
  config: z.object({
    measurementId: z.string().optional(),
  }),
});

  // Exportando o tipo inferido
  export type GoogleAnalyticsSchemaFormData = z.infer<typeof GoogleAnalyticsSchema>;