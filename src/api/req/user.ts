import { useMutation } from "@tanstack/react-query";
import axiosUser from "../../lib/axios/axiosUser";



type UserInformationProps = {
    name: string,
    email: string,
    theme: string,
    language: string,
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

export type StoreProps = {
    storeId: number,
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




export async function getUserInformation(): Promise<UserInformationProps> {
    const response = await axiosUser.get<{ userInformation: UserInformationProps }>('user');
    return response.data.userInformation;
    
}

export async function getStores() {
    const response = await axiosUser.get<{ stores: StoreProps[] }>('stores');
    console.log(response.data.stores);
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

export async function getTokenStore(storeId : number) {
    const response = await axiosUser.get(`openStore/${storeId}`, {
        storeId: storeId
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

