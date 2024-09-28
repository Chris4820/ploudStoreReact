import { CgSpinner } from "react-icons/cg";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import ConfirmModal from "../../../components/modal/confirmModal";
import type { InviteStoreProps } from "../api/req/store";
import StoreCardComponent from "../components/storeCard";
import { useGetInviteStores } from "../../../api/store/user";
import { useAcceptInviteStore } from "../mutations/acceptInviteMutation";

export default function InviteStoreSection() {
    const { data: inviteStore, isLoading } = useGetInviteStores();


    const { mutate: acceptInviteStore} = useAcceptInviteStore();


    if (isLoading) {
        return <div className="flex justify-center items-center w-full h-full"><CgSpinner className="animate-spin" size={20}/></div>;
    }

    if (!inviteStore || inviteStore.length <= 0) {
        return <CardEmptyComponent title="Nenhuma loja encontrada" description="Você não tem nenhum convite pendente!" />;
    }


    return (
        <>
            {inviteStore.map((inviteStore : InviteStoreProps) => (
                <ConfirmModal
                title="Aceitar convite"
                description={`Ao aceitar, você se tornará membro da loja ${inviteStore.store.name}`}
                key={inviteStore.store.id}
                onConfirm={() => acceptInviteStore(inviteStore.store.id)}
                >
                    <StoreCardComponent key={inviteStore.store.id} store={inviteStore.store} color="yellow"/>
                </ConfirmModal>
            ))}
        </>
        
    );
}
