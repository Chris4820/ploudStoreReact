import {  Outlet, useNavigate } from "react-router-dom";
import {  IoMdNotificationsOutline } from "react-icons/io";
import { useGetStoreInformation } from "../../features/stores/api/store/store";
import { AuthProvider } from "../../provider/AuthProvider";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../components/ui/slidebar";
import { AppSidebar } from "./NewSlideMenu";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { data: store } = useGetStoreInformation();

  return (
    <AuthProvider>
      <SidebarProvider>

        <AppSidebar/>
        <SidebarInset>
        <nav className="h-[70px] w-full sticky top-0 bg-secondary border-b z-20 flex items-center justify-between px-5">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden"/>
  
            <h1 
              onClick={() => navigate("/")} 
              className="text-purple-600 hidden lg:block text-xl font-bold cursor-pointer"
            >
              &lt;PloudStore/&gt;
            </h1>
  
            <a 
              href={`https://${store?.subdomain}.ploudstore.com`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hidden lg:block truncate hover:underline"
            >
              Aceder loja
            </a>
          </div>
  
          <div className="flex items-center gap-4">
            <button className="text-primary">
              <IoMdNotificationsOutline size={26} />
            </button>
          </div>
        </nav>
        <div className="border-l p-5">
          <Outlet/>
        </div>
          

        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}  