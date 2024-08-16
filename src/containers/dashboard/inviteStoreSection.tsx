import { CgSpinner } from "react-icons/cg";
import { useGetInviteStores } from "../../api/store/user";
import CardEmptyComponent from "../../components/commons/CardEmpty";
import { acceptInviteStore, InviteStoreProps } from "../../api/req/store";
import StoreCardComponent from "../../components/dashboard/store/storeCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ConfirmModal from "../../components/modal/confirmModal";

export default function InviteStoreSection() {
    const { data: inviteStore, isLoading } = useGetInviteStores();
    const queryClient = useQueryClient();


    const { mutate: acceptInvite } = useMutation({
        mutationFn: acceptInviteStore,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inviteStores'] });
            queryClient.invalidateQueries({ queryKey: ['subStores'] });
            toast('Convite aceito com sucesso!');
        }
    });


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
                onConfirm={() => acceptInvite(inviteStore.store.id)}
                >
                    <StoreCardComponent key={inviteStore.store.id} store={inviteStore.store} color="yellow"/>
                </ConfirmModal>
            ))}
        </>
        
    );
}
