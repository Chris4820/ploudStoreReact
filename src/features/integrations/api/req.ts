import type { z } from "zod";
import axiosStore from "../../../lib/axios/axiosStore";
import { GoogleAnalyticsSchema } from "../schema/analytics";
import { SlackSchema, type DiscordFormData, type IntegrationSchemaFormData, type SlackFormData } from "../schema/notification2";
import { DiscordSchema } from "../schema/notifications";
import { CrispSchema, TawkSchema } from "../schema/support";

export enum StoreIntegrationsProps {
  DISCORD_NOTIFICATION = 'DISCORD_NOTIFICATION',
  SLACK_NOTIFICATION = 'SLACK_NOTIFICATION',
  GOOGLE_ANALYTICS = 'GOOGLE_ANALYTICS',
  TAWK = 'TAWK',
  CRISP = 'CRISP',
  DISCORD_BOT = 'DISCORD_BOT',
}

export type IntegrationsProps = {
    isActive: boolean,
    type: StoreIntegrationsProps,
}

export async function getIntegrations(): Promise<IntegrationsProps[] | []> {
  const response = await axiosStore.get<IntegrationsProps[] | []>('integration');
  return response.data || []; 
}


export const integrationSchemas = {
  SLACK_NOTIFICATION: SlackSchema,
  DISCORD_NOTIFICATION: DiscordSchema,
  GOOGLE_ANALYTICS: GoogleAnalyticsSchema,
  TAWK: TawkSchema,
  CRISP: CrispSchema,
} as const;

export type IntegrationType = keyof typeof integrationSchemas;

export async function getIntegration<T extends IntegrationType>(type: T): Promise<z.infer<(typeof integrationSchemas)[T]> | undefined> {
  const response = await axiosStore.get(`integration/${type}`);
  const schema = integrationSchemas[type];

  try {
    const parsed = schema.parse(response.data);
    return parsed;
  } catch (error) {
    console.error("Erro de validação Zod:", error);
    return undefined;
  }
}


export async function getSlackNotificationIntegration(): Promise<SlackFormData | undefined> {
  const response = await axiosStore.get<SlackFormData>(`integration/SLACK_NOTIFICATION`);
  return response.data || undefined; 
}

export async function getDiscordNotificationIntegration(): Promise<DiscordFormData | undefined> {
  const response = await axiosStore.get<DiscordFormData>(`integration/DISCORD_NOTIFICATION`);
  return response.data || undefined; 
}


export async function updateIntegration(type: StoreIntegrationsProps, data: IntegrationSchemaFormData) {
  const response = await axiosStore.put(`integration`, 
    {
      data: {
        ...data,
        type
      }
      
      
    });
  return response.data;
}


