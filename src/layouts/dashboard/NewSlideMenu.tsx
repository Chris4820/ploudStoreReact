import { AppWindow, Box, ChevronsUpDown, CreditCard, LayoutDashboardIcon, LogOut, Palette, PieChartIcon, Settings, Star, User, UserPlus, Users } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../../components/ui/slidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { Separator } from "../../components/ui/separator";
import { useUser } from "../../provider/User/UserContext";
import { useLogoutUser } from "../../Internal/auth/logoutMutation";
import ChangeThemeComponent from "../../components/commons/ChangeThemeComponent";
import { t } from "../../lib/reacti18next/i18n";


  // Menu items.
  const menus = [
    {
      title: "dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "statistics",
      url: "/dashboard/statistic",
      icon: PieChartIcon,
    },
    {
      title: "payments",
      url: "/dashboard/payments",
      icon: CreditCard, // Ícone do Lucide React
    },
    {
      title: "products",
      url: "/dashboard/categories",
      icon: Box, // Ícone do Lucide React
    },
    {
      title: "engagement",
      url: "/dashboard/engagement",
      icon: Users, // Ícone do Lucide React
    },
    {
      title: "pages",
      url: "/dashboard/page",
      icon: AppWindow, // Ícone do Lucide React
    },
    {
      title: "design",
      url: "/dashboard/design",
      icon: Palette, // Ícone do Lucide React
    },
    {
      title: "subusers",
      url: "/dashboard/subuser",
      icon: UserPlus, // Ícone do Lucide React
    },
    {
      title: "settings",
      url: "/dashboard/settings",
      icon: Settings, // Mantido como está
    },
    {
      title: "plan",
      url: "/dashboard/plan",
      icon: Star, // Mantido como está
    },
  ]

  export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { isMobile, setOpenMobile } = useSidebar()

    const user = useUser();

    const { mutate: logoutUser} = useLogoutUser();


    const navigate = useNavigate();

    function isMenuItemSelected(href: string) {
      if (href === "/dashboard" && location.pathname.startsWith("/dashboard/")) {
        return false;
      }
      return location.pathname === href || location.pathname.startsWith(href);
    }

    return(
    <Sidebar {...props} className="w-full md:w-64 overflow-x-hidden">
      <SidebarHeader>
        <div className="flex flex-col justify-center items-center mt-3 md:mt-5">
          <Avatar className="h-14 w-14 md:h-20 md:w-20 rounded-lg">
            <AvatarImage src={""} alt={""} />
            <AvatarFallback className="rounded-lg bg-primary/10 text-xl md:text-2xl">CM</AvatarFallback>
          </Avatar>
          <div className="text-sm md:text-lg text-center px-1">
            <h1>Bem-Vindo novamente</h1>
            <h1 className="font-bold truncate max-w-[90%] mx-auto">{user?.name}</h1>
          </div>
        </div>
      </SidebarHeader>

      <Separator className="my-2 w-4/5 mx-auto"/>

      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarMenu>
          {menus.map((item) => (
            <SidebarMenuItem key={item.title} onClick={() => setOpenMobile(false)}>
              <NavLink 
                to={item.url} 
                className={`${
                  isMenuItemSelected(item.url) ? "border-r-4" : ""
                } w-full group/iconmenu relative cursor-pointer transition-all duration-300 border-purple-600 p-2 flex items-center gap-2 text-sm md:text-base`}
              >
                <item.icon size={21} className="group-hover/iconmenu:text-purple-600 ml-3 md:ml-5 shrink-0" />
                <span className="truncate">{t(item.title)}</span>
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t pt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="group/sidebaruser px-2"
                >
                  <Avatar className="h-8 w-8 rounded-lg shrink-0">
                    <AvatarImage src={""} alt={""} />
                    <AvatarFallback className="rounded-lg bg-primary/10 text-xs">CM</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left min-w-0">
                    <span className="truncate text-sm font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 shrink-0" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 max-w-[90vw] rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={""} alt={""} />
                  <AvatarFallback className="rounded-lg bg-primary/10">CM</AvatarFallback>
                </Avatar>
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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
  }