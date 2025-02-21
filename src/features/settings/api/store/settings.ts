import { useQuery } from "@tanstack/react-query";
import { getStoreSettings } from "../req/settings";









export function useGetStoreSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: getStoreSettings,
  })
}
