import type { GoalWidgetFormData } from "../../schema/GoalSchema";
import axiosStore from "../../../../lib/axios/axiosStore";

export type WidgetsProps = {
    id: number,
    header: string,
    widgetType: string,
    visible: boolean,
};

export type WidgetProps = {
    header: string,
    description?: string,
    config: any; // Config será genérico para aceitar diferentes tipos de widgets
}


export async function getStoreWidgets(): Promise<WidgetsProps[]> {
    const response = await axiosStore.get<{widgets: WidgetsProps[]}>('widgets');
    return response.data.widgets;
}


export async function getGoalWidget(): Promise<GoalWidgetFormData> {
    const response = await axiosStore.get<{widget: GoalWidgetFormData}>(`widget/goal`);
    return response.data.widget;
}

export type WidgetDefault = {
    header: string,
    description: string,
    visible: boolean,
    config: object,
    expireAt: string,
    startAt: string,
}

export async function getWidgetByType(type: string) {
    const response = await axiosStore.get<{widget: WidgetDefault}>(`widget/${type}`);
    return response.data.widget;
}


export async function updateWidget(data: WidgetDefault, type: string) {
    const response = await axiosStore.put(`widget/${type}`, {data});
    return response.data;
}



export async function updateOrderWidgets(widgets: number[]) {
    // Faça a requisição POST
    const response = await axiosStore.post('orderwidgets', {
        widgets,
    });
    return response;
}
