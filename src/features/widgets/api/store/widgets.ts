import { useQuery } from "@tanstack/react-query";
import { getGoalWidget, getStoreWidgets, getWidgetByType } from "../req/widgets";







export function useGetWidgets() {
  return useQuery({
  queryKey: ['widgets'],
  queryFn: () => getStoreWidgets(),
})
}

export function useGetGoalWidget() {
  return useQuery({
  queryKey: ['widget', 'goal'],
  queryFn: () => getGoalWidget(),
})
}

export function useGetWidgetByType(type: string) {
  return useQuery({
  queryKey: ['widget', type],
  queryFn: () => getWidgetByType(type),
})
}
