// shared/schemas/integrations.ts
import { z } from "zod";
import { DiscordSchema, SlackSchema } from "./notifications";
import { CrispSchema, TawkSchema } from "./support";
import { GoogleAnalyticsSchema } from "./analytics";





export const IntegrationSchema = z.discriminatedUnion("type", [
  SlackSchema,
  DiscordSchema,
  GoogleAnalyticsSchema,
  TawkSchema,
  CrispSchema,
]);

export type IntegrationFormData = z.infer<typeof IntegrationSchema>;
