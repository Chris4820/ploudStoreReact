import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import StoreSection from "../components/storeSection";
import InviteStoreSection from "../components/inviteStoreSection";
import SubStoreSection from "../components/subStoreSection";
import { useUser } from "../../../provider/User/UserContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useLogoutUser } from "../../../Internal/auth/logoutMutation";
import ChangeThemeComponent from "../../../components/commons/ChangeThemeComponent";


export default function StoresIndexPage() {
  const user = useUser();
  const navigate = useNavigate();
  const { mutate: logoutUser} = useLogoutUser();


    return(
        <section className='w-screen h-screen bg-gradient-to-r from-black to-purple-600 flex justify-center items-center'>

      <div className="bg-background mx-5 sm:w-[500px] w-full sm:mx-0 rounded-sm shadow-sm p-8 flex flex-col">

        <div className="h-[50px] flex justify-between items-center">
          <img src="/Logo.png" width={50} height={50}/>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="rounded-md border border-violet-600 bg-violet-600/30 p-2 hover:bg-violet-600/50 cursor-pointer">
              <span>{user.shortName}</span>
            </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="end"
            sideOffset={4}
          >

            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="rounded-md border border-violet-600 bg-violet-600/30 p-2 hover:bg-violet-600/50 cursor-pointer">
                    <span>{user.shortName}</span>
                  </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User />
                Perfil
              </DropdownMenuItem>
              <ChangeThemeComponent/>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logoutUser()}>
              <LogOut size={21}/>
              Terminar sessão
            </DropdownMenuItem>


          </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='flex h-[50px] justify-between items-center mt-5'>
          <div className='text-lg font-semibold'>
            <h1>Bem-Vindo(a) de volta</h1>
            <h1>{user?.name}</h1>
          </div>
          <Link to={'setup'}>
            <Button>Criar loja</Button>
          </Link>
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