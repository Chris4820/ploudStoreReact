import type { CustomDomainFormData } from "../../Schema/CustomDomainSchema";
import type { SubDomainFormData } from "../../Schema/SubDomainSchema";
import axiosStore from "../../../../lib/axios/axiosStore";








export async function updateSubDomain(data: SubDomainFormData) {
  const response = await axiosStore.put('subdomain', { data });
  return response.data;
}

export async function updateCustomDomain(data: CustomDomainFormData) {
  const response = await axiosStore.put('domain', { data });
  return response.data;
}

