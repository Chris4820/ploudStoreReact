import { useQuery } from "@tanstack/react-query"
import { getGateway } from "../req/gateway"





export function useGetGateway(gatewayType: string) {
  return useQuery({
    queryKey: [gatewayType],
    queryFn: () => getGateway(gatewayType),
  })
}

