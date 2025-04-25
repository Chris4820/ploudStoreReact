import { z } from 'zod';


// Definindo o esquema Zod
export const IntegrationSchema = z.object({
    config: z.object({
      //Opcional
    }).optional(),
    isActive: z.boolean(),
  });
  
  // Exportando o tipo inferido
  export type IntegrationSchemaFormData = z.infer<typeof IntegrationSchema>;


  export const DiscordSchema = z.object({
    isActive: z.boolean(),
    config: z.object({
      webhookUrl: z.string().url("URL inválido").min(1, "O Webhook URL é obrigatório"),
      notifications: z.object({
        LOW_STOCK: z.boolean().default(false),
        NEW_PAYMENT: z.boolean().default(false),
      }),
    }),
  });
  
  export type DiscordFormData = z.infer<typeof DiscordSchema>;


export const SlackSchema = z.object({
    isActive: z.boolean(),
    config: z.object({
      webhookUrl: z.string().url("URL inválido").min(1, "O Webhook URL é obrigatório"),
      notifications: z.object({
        LOW_STOCK: z.boolean().default(false),
        NEW_PAYMENT: z.boolean().default(false),
      }),
    }),
  });
  
  export type SlackFormData = z.infer<typeof SlackSchema>;
