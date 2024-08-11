import { CgSpinner } from "react-icons/cg";
import { useGetInviteStores } from "../../api/store/user";
import CardEmptyComponent from "../../components/commons/CardEmpty";
import { DialogDemo } from "../modal/acceptInviteStore";
import { InviteStoreProps } from "../../api/req/store";
import StoreCardComponent from "../../components/dashboard/store/storeCard";

export default function InviteStoreSection() {
    const { data: inviteStore, isLoading } = useGetInviteStores();

    if (isLoading) {
        return <div className="flex justify-center items-center w-full h-full"><CgSpinner className="animate-spin" size={20}/></div>;
    }

    if (!inviteStore || inviteStore.length <= 0) {
        return <CardEmptyComponent title="Nenhuma loja encontrada" desc="Você não tem nenhum convite pendente!" />;
    }


    return (
        <>
            {inviteStore.map((inviteStore : InviteStoreProps) => (
                <DialogDemo inviteStore={inviteStore}>
                    <StoreCardComponent key={inviteStore.store.storeId} store={inviteStore.store} color="yellow"/>
                </DialogDemo>
            ))}
        </>
        
    );
}
