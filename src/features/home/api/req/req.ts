import axiosStore from "../../../../lib/axios/axiosStore";


type NotificationProps = {
  title: string,
  description: string,
  type: 'GOAL'
}


export async function getStoreNotifications() {
  const response = await axiosStore<{notifications: NotificationProps[]}>('notification');
  return response.data.notifications;
}

export type GraphProps = {
  date: string,
  value: number,
}

export async function getGraphDataLast7Days() {
  const response = await axiosStore<{graph: GraphProps[]}>('graph');
  return response.data.graph;
}

export type StorePlanProps = {
  plan: 'basic' | 'standard' | 'premium',
  period: 'MONTHLY' | 'YEARLY'
  overdueDate: string,
  extra_price: number,
  status: 'PAID' | 'CANCELLED'

}
export async function getStorePlan() {
  const response = await axiosStore<{plan: StorePlanProps}>('plan');
  return response.data.plan;
}