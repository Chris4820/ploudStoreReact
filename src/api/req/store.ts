import type { OpenStoreProps } from "../../features/stores/mutations/openStoreMutation";
import axiosStore from "../../lib/axios/axiosStore";
import axiosUser from "../../lib/axios/axiosUser";

export type StoreInformationProps = {
    name: string,
    description: string,
    shortname: string,
    category: string,
    domain: string,
    subdomain: string,
    currency: string,
    locale: string,
    createdAt: string,
    maintenance: boolean
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

export type SubStoreProps = {
    store: StoreProps;
    role: string,
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

export async function getTokenStore(data: OpenStoreProps) {
    const response = await axiosUser.get(`openStore/${data.storeId}`, {
        params: {
            isOwner: data.isOwner,
        }
    })
    return response;
}

export async function getSubStores() {
    const response = await axiosUser.get<{ subStores: SubStoreProps[]}>('substores');
    return response.data.subStores;
}
export async function createNewStore(store: StoreProps) {
    const response = await axiosUser.post('store', store);
    return response.data;
}

export async function getInviteStores() {
    const response = await axiosUser.get<{ inviteStores: InviteStoreProps[]}>('inviteStores');
    return response.data.inviteStores;
}

export async function acceptInviteStore(storeId: number) {
    const response = await axiosUser.put(`inviteStore/${storeId}`);
    return response;
}

export async function deleteInviteStore(storeId: number) {
    const response = await axiosUser.delete(`inviteStore/${storeId}`);
    return response;
}



