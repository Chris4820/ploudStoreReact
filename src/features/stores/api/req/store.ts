import type { StoreInformationProps } from "../../../../globaldata/httpglobal";
import axiosStore from "../../../../lib/axios/axiosStore";
import axiosUser from "../../../../lib/axios/axiosUser";
import type { CreateStoreFormData } from "../../schema/createStoreSchema";


export type StoreProps = {
    id: number,
    name: string,
    activeDomain: string,
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

export async function createStore(data : CreateStoreFormData) {
    const response = await axiosUser.post('store', { data });
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


