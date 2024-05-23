import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import StoreSection from "../containers/dashboard/storeSection";
import SubStoreSection from "../containers/dashboard/subStoreSection";
import InviteStoreSection from "../containers/dashboard/inviteStoreSection";
import { useGetUserInformation } from "../api/store/user";
import UserMenu from "../layouts/dashboard/UserMenu";


export default function ShopsIndexPage() {
  const { data: user } = useGetUserInformation(); 

    return(
        <section className='w-screen h-screen bg-gradient-to-r from-black to-purple-600 flex justify-center items-center'>

      <div className="bg-background mx-5 sm:w-[500px] w-full sm:mx-0 rounded-sm shadow-sm p-9 flex flex-col">

        <div className="h-[50px] w-full text-center">
          <h1 className="text-3xl font-semibold">PloudStore</h1>
        </div>

        <div className='flex h-[50px] justify-between items-center mt-5'>
          <div className='text-lg font-semibold'>
            <h1>Bem-Vindo(a) de volta</h1>
            <h1>{user?.name}</h1>
          </div>
          <Link to={'setup'}>
            <Button>Criar loja</Button>
          </Link>
          <UserMenu/>
        </div>

        <div className="w-full">
            <div className="max-h-[350px] min-h-[350px] mt-5">
                <Tabs defaultValue="userStores" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="userStores">Suas lojas</TabsTrigger>
                    <TabsTrigger value="subStores">Outras lojas</TabsTrigger>
                    <TabsTrigger value="inviteStores">Convites</TabsTrigger>
                    </TabsList>
                    <ul className='flex flex-col gap-2 h-[350px] overflow-auto'>
                    <TabsContent className="space-y-1" value="userStores">
                        <StoreSection/>
                    </TabsContent>
                    <TabsContent className="space-y-1" value="subStores">
                        <SubStoreSection/>
                    </TabsContent>
                    <TabsContent className="space-y-1" value="inviteStores">
                        <InviteStoreSection/>
                    </TabsContent>
                    </ul>
                </Tabs>
            </div>
        </div>

      </div>
    </section>
    )
}