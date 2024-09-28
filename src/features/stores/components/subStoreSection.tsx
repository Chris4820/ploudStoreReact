import { CgSpinner } from "react-icons/cg";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import StoreCardComponent from "../components/storeCard";
import type { SubStoreProps } from "../api/req/store";
import { useGetSubStores } from "../../../api/store/user";
import { useOpenStore } from "../mutations/openStoreMutation";

export default function SubStoreSection() {
    const { data: subStore, isLoading } = useGetSubStores();

    const { mutate: openStore} = useOpenStore();

    if (isLoading) {
        return <div className="flex justify-center items-center w-full h-full"><CgSpinner className="animate-spin" size={20}/></div>;
    }

    if (!subStore || subStore.length <= 0) {
        return <CardEmptyComponent title="Nenhuma loja encontrada" description="Você ainda não tem uma loja!" />;
    }

    return (
        <>
            {subStore.map((subStore : SubStoreProps) => (
                <StoreCardComponent 
                key={subStore.store.id} 
                store={subStore.store} 
                color="blue" 
                onClick={() => openStore({storeId: subStore.store.id, isOwner: false})}/>
            ))}
        </>
    );
}
