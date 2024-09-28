import { useMutation } from "@tanstack/react-query";
import { updateGateway, type GatewayProps } from "../api/req/gateway";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import queryClient from "../../../lib/reactquery/reactquery";


export const useUpdateGateway = (gatewayType : string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: GatewayProps) => updateGateway(gatewayType, data),
    onSuccess: (_, variables) => {
      // Atualiza o cache com os dados retornados
      queryClient.setQueryData([gatewayType], (oldData: GatewayProps) => {
        // Supondo que oldData seja um objeto
        return {
          ...oldData, // Mantém os dados antigos
          ...variables,   // Atualiza com os novos dados
        };
      });
      navigate("../checkout");
      toast.success("Sucesso"); 
    }
  })
}