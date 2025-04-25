import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../lib/reactquery/reactquery";
import { toast } from "sonner";
import { updateIntegration, type IntegrationsProps, type StoreIntegrationsProps } from "../api/req";
import type { IntegrationSchemaFormData } from "../schema/notification2";

export const useUpdateIntegration = (integrationType: StoreIntegrationsProps) => {
  return useMutation({
    mutationFn: (data: IntegrationSchemaFormData) => 
      updateIntegration(integrationType, data),
    onSuccess: (_, variables) => {
      // Update specific integration cache
      queryClient.setQueryData(
        ['integrations', integrationType], 
        (oldData: IntegrationsProps | undefined) => {
          if (!oldData) return;
          return {
            isActive: variables.isActive,
            config: variables.config
          };
        }
      );

      // Atualiza ou adiciona à lista de integrações
      queryClient.setQueryData(
        ['integrations'],
        (oldData: IntegrationsProps[] | undefined) => {
          if (!oldData) {
            return [{
              type: integrationType,
              isActive: variables.isActive
            }];
          }

          const exists = oldData.some(integration => integration.type === integrationType);

          if (exists) {
            return oldData.map((integration) => {
              if (integration.type === integrationType) {
                return {
                  ...integration,
                  isActive: variables.isActive
                };
              }
              return integration;
            });
          } else {
            return [
              ...oldData,
              {
                type: integrationType,
                isActive: variables.isActive
              }
            ];
          }
        }
      );

      toast.success('Integração atualizada com sucesso');
    },
  });
};