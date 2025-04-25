import { useQuery } from "@tanstack/react-query";
import { getDiscordNotificationIntegration, getIntegration, getIntegrations, getSlackNotificationIntegration, integrationSchemas, type IntegrationType } from "./req";




export function useGetIntegrations() {
  return useQuery({
  queryKey: ['integrations'],
  queryFn: () => getIntegrations(),
})
}

export function useGetSlackNotificationIntegration() {
  return useQuery({
  queryKey: ['integrations', "SLACK_NOTIFICATION"],
  queryFn: () => getSlackNotificationIntegration(),
})
}

export function useGetDiscordNotificationIntegration() {
  return useQuery({
  queryKey: ['integrations', "DISCORD_NOTIFICATION"],
  queryFn: () => getDiscordNotificationIntegration(),
})
}

const isValidIntegrationType = (type: IntegrationType) => {
  return type in integrationSchemas;
};

export function useGetIntegration(type: IntegrationType) {
  return useQuery({
    queryKey: ['integrations', type],
    queryFn: () => {
      if (isValidIntegrationType(type)) {
        return getIntegration(type);
      }
      return Promise.resolve(undefined); // ou lançar erro, se quiseres
    },
  });
}

