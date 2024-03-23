import { CgArrowRight, CgSpinner } from "react-icons/cg";
import { useAcceptInviteStore, useGetInviteStores } from "../../api/store/user";
import CardEmptyComponent from "../../components/CardEmpty";
import { InviteStoreProps } from "../../api/req/user";
import { toast } from "sonner";
import { QueryClient } from "@tanstack/react-query";
import { DialogDemo } from "../modal/acceptInviteStore";

export default function InviteStoreSection() {
    const { data: inviteStore, isLoading } = useGetInviteStores();
    const acceptInvite = useAcceptInviteStore(); // Move the hook call here
    const queryClient = new QueryClient();


    async function acceptInviteStoree(storeId: number) {
        try {
            const response = await acceptInvite(storeId);
            console.log("Chamado");
            toast("Sucesso");
            queryClient.refetchQueries({ queryKey: ['inviteStores']})
            queryClient.refetchQueries({ queryKey: ['subStores']})
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return <div className="flex justify-center items-center w-full h-full"><CgSpinner className="animate-spin" size={20}/></div>;
    }

    if (!inviteStore || inviteStore.length <= 0) {
        return <CardEmptyComponent title="Nenhuma loja encontrada" desc="Você não tem nenhum convite pendente!" />;
    }

    return (
        <>
            {inviteStore.map((inviteStore : InviteStoreProps) => (
                <StoreListItem key={inviteStore.store.storeId} inviteStore={inviteStore}/>
            ))}
        </>
    );
}

function StoreListItem({ inviteStore }: { inviteStore: InviteStoreProps }) {
    return (
        <DialogDemo inviteStore={inviteStore}>
        <li className="w-full group p-3 border rounded-md flex justify-between items-center hover:bg-gray-200 duration-700 cursor-pointer">
            <div className="flex gap-2">
                <div className="w-10 h-10 rounded-md flex items-center justify-center bg-yellow-500">
                    {inviteStore.store.shortName}
                </div>
                <div>
                    <h1 className="font-semibold text-sm">{inviteStore.store.name}</h1>
                    <p className="text-[13px]">{inviteStore.store.url}</p>
                </div>
            </div>
            <div>
                <div className="hidden group-hover:flex">
                    <CgArrowRight size={16} />
                </div>
            </div>
        </li>
        </DialogDemo>
    );
}
