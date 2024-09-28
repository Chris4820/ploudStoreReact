import axiosStore from "../../../../lib/axios/axiosStore";



export type GatewayProps = {
  config?: object,
  active?: boolean,
  tax?: number,
}


export async function updateGateway(gatewayType: string, data: GatewayProps) {
  const response = await axiosStore.post(`gateway/${gatewayType}`, { data });
  return response.data;
}

export async function getGateway(gatewayType: string) {
  const response = await axiosStore.get<{gateway: GatewayProps}>(`gateway/${gatewayType}`);
  return response.data.gateway
}
