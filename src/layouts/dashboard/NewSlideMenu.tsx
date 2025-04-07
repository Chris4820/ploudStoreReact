import { AppWindow, Box, ChevronsUpDown, CreditCard, LayoutDashboardIcon, LogOut, Palette, PieChartIcon, Settings, Star, User, UserPlus, Users } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../components/ui/slidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { Separator } from "../../components/ui/separator";
import { useUser } from "../../provider/User/UserContext";
import { useLogoutUser } from "../../Internal/auth/logoutMutation";
import ChangeThemeComponent from "../../components/commons/ChangeThemeComponent";
import { t } from "../../lib/reacti18next/i18n";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import { useSidebar } from '../../hooks/useSidebar';
import { useStore } from '../../provider/Store/StoreContext';


const menus = [
  { title: "dashboard", url: "/dashboard", icon: LayoutDashboardIcon, end: true },
  { title: "statistics", url: "/dashboard/statistic", icon: PieChartIcon },
  { title: "payments", url: "/dashboard/payments", icon: CreditCard },
  { title: "products", url: "/dashboard/categories", icon: Box },
  { title: "engagement", url: "/dashboard/engagement", icon: Users },
  { title: "pages", url: "/dashboard/page", icon: AppWindow },
  { title: "design", url: "/dashboard/design", icon: Palette },
  { title: "members", url: "/dashboard/subuser", icon: UserPlus },
  { title: "settings", url: "/dashboard/settings", icon: Settings },
  { title: "plan", url: "/dashboard/plan", icon: Star },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile, setOpenMobile, state } = useSidebar();
  const user = useUser();
  const store = useStore();
  const { mutate: logoutUser } = useLogoutUser();
  const navigate = useNavigate();
  const isCollapsed = state === "collapsed";


  function isMenuItemSelected(href: string) {
    if (href === "/dashboard" && location.pathname.startsWith("/dashboard/") && location.pathname !== "/dashboard") {
      return false;
    }
    return location.pathname === href || location.pathname.startsWith(href);
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar 
        {...props} 
        collapsible="icon"
        className="w-full md:w-64 overflow-x-hidden border-r dark:border-gray-600"
      >
        <SidebarHeader className={isCollapsed ? "flex justify-center py-4" : "px-2"}>
          <div className={`flex flex-col items-center ${isCollapsed ? 'gap-0' : 'gap-3'}`}>
            <Avatar className={`rounded-lg ${isCollapsed ? 'h-10 w-10' : 'h-14 w-14 md:h-20 md:w-20'}`}>
              <AvatarImage 
                src={store.logoUrl} 
                alt={store.name || "Loja"}
                className="object-cover"
              />
              <AvatarFallback className="rounded-lg bg-primary/10 text-xl">
                {store.shortName}
              </AvatarFallback>
            </Avatar>
            
            {!isCollapsed && (
              <div className="text-center space-y-1">
                <h1 className="text-lg font-semibold truncate mx-auto">
                  {store.name}
                </h1>
                <div className="text-xs font-medium px-2 py-0.5 rounded-md bg-muted text-violet-600">
                  {store.StorePlan?.plan?.toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </SidebarHeader>

        {!isCollapsed && <Separator className="my-2 w-4/5 mx-auto" />}

        <SidebarContent className="flex-1 overflow-y-auto px-2">
          <SidebarMenu>
            {menus.map((item) => (
              <SidebarMenuItem key={item.url} onClick={() => setOpenMobile(false)}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink
                      to={item.url}
                      end={item.end}
                      className={`
                        w-full group/item-menu relative cursor-pointer transition-all duration-300 
                        ${isMenuItemSelected(item.url) && `text-violet-600 border-violet-600 ${!isCollapsed && 'border-l-4'} `} 
                        flex items-center gap-3 py-2 px-3 ${isCollapsed && 'justify-center'}
                      `}
                    >
                      <item.icon
                        size={22}
                        className={`shrink-0  group-hover/item-menu:text-violet-600/80 duration-300 ${isCollapsed ? 'mx-auto' : ''}`}
                      />
                      {!isCollapsed && (
                        <span className="truncate text-sm font-medium ">
                          {t(item.title)}
                        </span>
                      )}
                    </NavLink>
                  </TooltipTrigger>
                    <TooltipContent side="right" className={`font-medium ${!isCollapsed && 'hidden'}`}>
                      {t(item.title)}
                    </TooltipContent>
                </Tooltip>
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
                    className="px-2 w-full hover:bg-transparent"
                  >
                    <Avatar className="h-8 w-8 rounded-lg shrink-0">
                      <AvatarImage src={""} alt={user?.name} />
                      <AvatarFallback className="rounded-lg bg-primary/10">
                        {user?.shortName}
                      </AvatarFallback>
                    </Avatar>
                    
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0 text-left">
                        <p className="truncate text-sm font-semibold">{user?.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    )}
                    
                    {!isCollapsed && (
                      <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-70" />
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="font-normal p-2">
                    <div className="flex gap-3 items-center">
                      <Avatar className="h-9 w-9 rounded-lg">
                        <AvatarImage src={""} alt={user?.name} />
                        <AvatarFallback className="rounded-lg">
                          {user?.shortName}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{user?.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      {t('profile')}
                    </DropdownMenuItem>
                    <ChangeThemeComponent />
                  </DropdownMenuGroup>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={() => logoutUser()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}