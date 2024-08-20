import { useOpenStore } from "../mutations/openStoreMutation";
import { useGetStores } from "../../../api/store/user";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import type { StoreProps } from "../../../api/req/store";
import StoreCardComponent from "../components/storeCard";
import LoadingComponent from "../../../containers/LoadingComponent";



export default function StoreSection() {


    const { data: store, isLoading } = useGetStores();

    const { mutate: openStore} = useOpenStore();

    if (isLoading) {
        return <LoadingComponent/>
    }

    if (!store || store.length <= 0) {
        return <CardEmptyComponent title="Nenhuma loja encontrada" description="Você ainda não tem uma loja!" />;
    }

    return (
        <>
            {store.map((store : StoreProps) => (
                <StoreCardComponent 
                key={store.id} 
                store={store} 
                color="pink" 
                onClick={() => openStore({storeId: store.id, isOwner: true})}/>
            ))}
        </>
    );
}
