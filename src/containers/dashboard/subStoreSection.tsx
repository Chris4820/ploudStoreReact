import { CgArrowRight, CgSpinner } from "react-icons/cg";
import CardEmptyComponent from "../../components/commons/CardEmpty";
import { useNavigate } from "react-router-dom";
import { useGetSubStores } from "../../api/store/user";
import { toast } from "sonner";
import { createStoreToken } from "../../lib/utils";
import { SubStoreProps, getTokenStore } from "../../api/req/store";
import StoreCardComponent from "../../components/dashboard/store/storeCard";

export default function StoreSection() {
    const { data: subStore, isLoading } = useGetSubStores();
    const navigate = useNavigate();

    async function openStore(storeId: number) {
        try {
            console.log(storeId);
            const response = await getTokenStore(storeId);
            const responseData = response.data;
            if(response.status === 200) {
                const storeToken = responseData.storeToken;
                if(!storeToken) {
                    toast('Ocorreu um erro ao ler o storeToken');
                    return;
                }
                await createStoreToken(storeToken);
                return navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return <div className="flex justify-center items-center w-full h-full"><CgSpinner className="animate-spin" size={20}/></div>;
    }

    if (!subStore || subStore.length <= 0) {
        return <CardEmptyComponent title="Nenhuma loja encontrada" desc="Você ainda não tem uma loja!" />;
    }

    return (
        <>
            {subStore.map((subStore : SubStoreProps) => (
                <StoreCardComponent store={subStore.store} color="blue" onClick={() => openStore(subStore.store.storeId)}/>
            ))}
        </>
    );
}
