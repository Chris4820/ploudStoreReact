import { useQuery } from "@tanstack/react-query";
import { getRevenueSummary } from "../../../statistic/api/req/statistic";
import { getStoreInformation } from "../req/store";
import { getStoreWidgets } from "../../../widgets/api/req/widgets";
import { getDesign } from "../../../../api/req/store/design";



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

