import { CgArrowRight, CgSpinner } from "react-icons/cg";
import CardEmptyComponent from "../../components/CardEmpty";
import { useNavigate } from "react-router-dom";
import { StoreProps, getTokenStore } from "../../api/req/user";
import { useGetStores } from "../../api/store/user";
import { toast } from "sonner";
import { createStoreToken } from "../../lib/utils";

export default function StoreSection() {
    const { data: store, isLoading } = useGetStores();
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

    if (!store || store.length <= 0) {
        return <CardEmptyComponent title="Nenhuma loja encontrada" desc="Você ainda não tem uma loja!" />;
    }

    return (
        <>
            {store.map((store : StoreProps) => (
                <li key={store.storeId} onClick={() => openStore(store.storeId)} className="w-full group p-3 border rounded-md flex justify-between items-center hover:bg-muted duration-700 cursor-pointer">
                <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center bg-pink-500">
                        {store.shortName}
                    </div>
                    <div>
                        <h1 className="font-semibold text-sm">{store.name}</h1>
                        <p className="text-[13px]">{store.subdomain}</p>
                    </div>
                </div>
                <div>
                    <div className="hidden group-hover:flex">
                        <CgArrowRight size={16} />
                    </div>
                </div>
            </li>
            ))}
        </>
    );
}
