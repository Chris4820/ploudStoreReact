import axiosStore from "../../../lib/axios/axiosStore";

export type WidgetProps = {
    bestClientShow: boolean;
    bestClientShowValue: boolean;
    showDiscord: boolean;
    discordId: string;
    lastPurchaseShow: boolean;
    lastPurchaseShowValue: boolean;
    topProductShow: boolean;
};


export async function getStoreWidgets(): Promise<WidgetProps> {
    const response = await axiosStore.get<{widgets: WidgetProps}>('widgets');
    return response.data.widgets; // Obtemos o primeiro item do array
}