import { CgArrowRight, CgSpinner } from "react-icons/cg";
import CardEmptyComponent from "../../components/CardEmpty";
import { useNavigate } from "react-router-dom";
import { SubStoreProps, getTokenStore } from "../../api/req/user";
import { useGetSubStores } from "../../api/store/user";
import { toast } from "sonner";
import { createStoreToken } from "../../lib/utils";

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
                <li key={subStore.store.storeId} onClick={() => openStore(subStore.store.storeId)} className="w-full group p-3 border rounded-md flex justify-between items-center hover:bg-gray-200 duration-700 cursor-pointer">
                <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center bg-blue-500">
                        {subStore.store.shortName}
                    </div>
                    <div>
                        <h1 className="font-semibold text-sm">{subStore.store.name}</h1>
                        <p className="text-[13px]">{subStore.role}</p>
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
