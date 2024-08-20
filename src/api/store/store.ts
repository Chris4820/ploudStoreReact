import { useQuery } from "@tanstack/react-query";
import { getRevenueSummary } from "../req/store/statistic";
import { getStoreInformation } from "../req/store";
import { getStoreWidgets } from "../req/store/widgets";
import { getDesign } from "../req/store/design";



export function useGetRevenueSummary() {
    return useQuery({
      queryKey: ['revenueSummary'],
      queryFn: getRevenueSummary,
    })
  }

export function useGetStoreInformation() {
    return useQuery({
      queryKey: ['store'],
      queryFn: getStoreInformation,
    })
  }

  export function useGetStoreWidgets() {
    return useQuery({
      queryKey: ['widgets'],
      queryFn: getStoreWidgets,
    })
  }

  export function useGetDesign() {
    return useQuery({
      queryKey: ['design'],
      queryFn: getDesign,
    })
  }
