import { Box, ChevronsUpDown, CreditCard, LayoutDashboardIcon, LogOut, Moon, Palette, PieChartIcon, Settings, Star, Sun, User, UserPlus, Users } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../../components/ui/slidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetUserInformation } from "../../api/store/user";
import { Separator } from "../../components/ui/separator";
import { t } from "../../lib/reacti18next/i18n";
import { useTheme } from "../providers/Theme";
import { logout } from "../../features/auth/api/req/auth";



  // Menu items.
  const menus = [
    {
      title: t("dashboard"),
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: t("statistics"),
      url: "/dashboard/statistic",
      icon: PieChartIcon,
    },
    {
      title: t("payments"),
      url: "/dashboard/payments",
      icon: CreditCard, // Ícone do Lucide React
    },
    {
      title: t("products"),
      url: "/dashboard/categories",
      icon: Box, // Ícone do Lucide React
    },
    {
      title: t("engagement"),
      url: "/dashboard/engagement",
      icon: Users, // Ícone do Lucide React
    },
    {
      title: t("design"),
      url: "/dashboard/design",
      icon: Palette, // Ícone do Lucide React
    },
    {
      title: t("subusers"),
      url: "/dashboard/subuser",
      icon: UserPlus, // Ícone do Lucide React
    },
    {
      title: t("settings"),
      url: "/dashboard/settings",
      icon: Settings, // Mantido como está
    },
    {
      title: t("plan"),
      url: "/dashboard/plan",
      icon: Star, // Mantido como está
    },
  ]

  export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { isMobile, setOpenMobile } = useSidebar()

    const {data:user} = useGetUserInformation();
    const { setTheme , theme} = useTheme();

    const navigate = useNavigate();

    function changeTheme() {
      if(theme === "dark") {
          setTheme("light");
          return;
      }
      setTheme("dark");
    }

    async function logoutUser() {
      await logout();
      return navigate("/auth/login")
    }

    function isMenuItemSelected(href: string) {
      if (href === "/dashboard" && location.pathname.startsWith("/dashboard/")) {
        return false;
      }
      return location.pathname === href || location.pathname.startsWith(href);
    }

    return(
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex flex-col justify-center items-center mt-5">
        <Avatar className="h-20 w-20 rounded-lg">
          <AvatarImage src={""} alt={""} />
          <AvatarFallback className="rounded-lg bg-primary/10 text-2xl">CM</AvatarFallback>
        </Avatar>
        <div className="text-lg text-center">
          <h1>Bem-Vindo novamente</h1>
          <h1 className="font-bold">{user?.name}</h1>
        </div>
        </div>
      </SidebarHeader>
      <Separator className="my-2 w-4/5 mx-auto"/>
      <SidebarContent>
      <SidebarMenu>
      {menus.map((item) => (
        <SidebarMenuItem key={item.title} onClick={() => setOpenMobile(false)}>
            <NavLink to={item.url} className={`${isMenuItemSelected(item.url) ? "border-r-4" : ""} w-full group/iconmenu relative cursor-pointer transition-all duration-300 border-purple-600 p-2 flex items-center gap-2 text-base`}>
              <item.icon size={21} className="group-hover/iconmenu:text-purple-600 ml-5 " /> {/* Aumentando o tamanho do ícone */}
              <span className="">{item.title}</span> {/* Aumentando o tamanho do texto */}
            </NavLink>
        </SidebarMenuItem>
      ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
      <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group/sidebaruser"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={""} alt={""} />
                <AvatarFallback className="rounded-lg bg-primary/10 group-hover/sidebaruser:text-violet-600 group-data-[state=open]/sidebaruser:text-violet-600">CM</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
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
              <DropdownMenuItem onClick={() => changeTheme()}>
                {theme === 'dark' ? (
                  <>
                    <Sun size={21}/>
                    Tema claro
                  </>
                ): (
                  <>
                    <Moon size={21}/>
                    Tema escuro
                  </>
                )}
                
              </DropdownMenuItem>
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