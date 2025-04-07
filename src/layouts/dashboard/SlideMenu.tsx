import { Outlet, useNavigate } from "react-router-dom"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../components/ui/slidebar"
import { useStore } from "../../provider/Store/StoreContext"
import { AppSidebar } from "./NewSlideMenu"
import { FaDiscord, FaInstagram } from "react-icons/fa"
import { Button } from "../../components/ui/button"

export default function DashboardLayout() {
  const navigate = useNavigate()
  const store = useStore()

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex flex-col w-full overflow-hidden">
        <nav className="h-[70px] w-full sticky top-0 bg-secondary border-b dark:border-gray-600 z-20 flex items-center justify-between px-4 md:px-5">
          <div className="flex items-center gap-2 md:gap-4">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

            <h1
              onClick={() => navigate("/")}
              className="text-violet-600 text-lg lg:text-xl font-bold cursor-pointer truncate"
            >
              &lt;PloudStore/&gt;
            </h1>

            {store.activeDomain && (
              <a
                href={`https://${store.activeDomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hidden lg:block truncate hover:underline"
              >
                Aceder loja
              </a>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button size={"icon"} variant={"ghost"} className="text-primary hover:bg-violet-600/30 transition-colors">
              <FaInstagram size={26} />
            </Button>
            <Button size={"icon"} variant={"ghost"} className="text-primary hover:bg-violet-600/30 transition-colors">
              <FaDiscord size={26} />
            </Button>
          </div>
        </nav>

        <div className="flex-1 overflow-hidden">
          <div className="h-full w-full overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-8">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

