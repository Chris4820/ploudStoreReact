import { z } from "zod";

const NotificationsSchema = z.object({
  LOW_STOCK: z.boolean({
    required_error: "O campo LOW_STOCK é obrigatório.",
    invalid_type_error: "O campo LOW_STOCK tem de ser um valor booleano.",
  }),
  NEW_PAYMENT: z.boolean({
    required_error: "O campo NEW_PAYMENT é obrigatório.",
    invalid_type_error: "O campo NEW_PAYMENT tem de ser um valor booleano.",
  }),
});

export const SlackSchema = z.object({
  type: z.literal("SLACK_NOTIFICATION"),
  isActive: z.boolean({
    required_error: "O campo isActive é obrigatório.",
    invalid_type_error: "O campo isActive tem de ser um valor booleano.",
  }),
  config: z.object({
    webhookUrl: z.string({
      required_error: "O campo webhookUrl é obrigatório.",
    })
    .url("O campo webhookUrl deve ser um URL válido."),
    notifications: NotificationsSchema.optional(),
  }),
});

export const DiscordSchema = z.object({
  type: z.literal("DISCORD_NOTIFICATION"),
  isActive: z.boolean(),
  config: z.object({
    webhookUrl: z.string().url("O campo webhookUrl deve ser um URL válido."),
    notifications: NotificationsSchema.optional(),
  }),
});