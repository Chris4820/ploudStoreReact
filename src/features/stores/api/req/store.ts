import type { SettingsFormData } from "../../../settings/schema/SettingsSchema";
import axiosStore from "../../../../lib/axios/axiosStore";
import axiosUser from "../../../../lib/axios/axiosUser";

export type StoreInformationProps = {
    name: string,
    description: string,
    shortname: string,
    gameType: 'MINECRAFT' | 'FIVEM',
    domain: string,
    subdomain: string,
    activedomain: string,
    currency: string,
    locale: string,
    createdAt: string,
    maintenance: boolean,
    type: 'MINECRAFT' | 'FIVEM',
    keywords: string
}

export type StoreProps = {
    id: number,
    name: string,
    subdomain: string,
    gametype: "MINECRAFT" | "FIVEM" | "REDM",
    shortName?: string,
    ownerId?: number,
}

export type createStoreProps = {
    name: string,
    description: string,
    subDomain: string,
    current: string,
    gameType: 'MINECRAFT' | 'FIVEM' | 'REDDEAD',
}

export type InviteStoreProps = {
    store: StoreProps;
    role: string,
    created_at: string,
}


export async function getStoreInformation(): Promise<StoreInformationProps> {
    const response = await axiosStore.get<{store: StoreInformationProps}>('store');
    return response.data.store; // Obtemos o primeiro item do array
}

export async function saveStoreInformation({name, description, keywords, currency,maintenance} : StoreInformationProps) {
    const response = await axiosStore.put('/store', {
        name: name,
        description: description,
        keywords: keywords,
        currency: currency,
        maintenance: maintenance,
    })
    return response.data;
}
export async function getStores() {
    console.log("Chamouuu");
    const response = await axiosUser.get<{ stores: StoreProps[] }>('stores');
    console.log("Response: " + response);
    return response.data.stores; // Retorna apenas a array de lojas
}

export async function createStore({name, description, subDomain, current, gameType} : createStoreProps) {
    const response = await axiosUser.post('store', {
        name: name,
        description: description,
        subDomain: subDomain,
        current: current,
        gameType: gameType,
    })
    return response;
}

export async function getTokenStore(storeId: number, isOwner: boolean | undefined) {
    const response = await axiosUser.get(`openStore/${storeId}`, {
        params: {
            isOwner: isOwner,
        }
    })
    return response;
}



export type SubStoreProps = {
    store: StoreProps;
    role: string,
}

export async function getSubStores() : Promise<SubStoreProps[]> {
    const response = await axiosUser.get<{ substores: SubStoreProps[]}>('substores');
    return response.data.substores;
}

export async function createNewStore(store: StoreProps) {
    const response = await axiosUser.post('store', store);
    return response.data;
}

export async function getInviteStores() : Promise<InviteStoreProps[]> {
    const response = await axiosUser.get<{ invitestore: InviteStoreProps[]}>('inviteStores');
    return response.data.invitestore;
}

export async function acceptInviteStore(storeId: number) {
    const response = await axiosUser.put(`inviteStore/${storeId}`);
    return response;
}

export async function deleteInviteStore(storeId: number) {
    const response = await axiosUser.delete(`inviteStore/${storeId}`);
    return response;
}


export async function getStoreSettings() {
    const response = await axiosStore.get<{ settings: SettingsFormData}>('storesettings');
    return response.data.settings;
}
export async function updateStoreSettings(data: SettingsFormData) {
    const response = await axiosStore.put("storesettings", { data });
    return response;
}



