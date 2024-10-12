import { BsClipboard2Data } from "react-icons/bs";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoMdMenu, IoMdNotificationsOutline } from "react-icons/io";
import { CiCreditCard1 } from "react-icons/ci";
import UserMenu from "./UserMenu";
import { IoSettingsOutline } from "react-icons/io5";
import { useGetStoreInformation } from "../../features/stores/api/store/store";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { t } from "i18next";
import { LuBox } from "react-icons/lu";
import { MdCardMembership, MdOutlineDesignServices } from "react-icons/md";
import { useState } from "react";
import { AuthProvider } from "../../provider/AuthProvider";
import { useGetPlan } from "../../features/home/api/store/store";
import PlanInfo from "./PlanCard";
import { LayoutPanelLeft, Star } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";

export default function DashboardLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: plan, isLoading: planLoading } = useGetPlan();
  const navigate = useNavigate();
  const { data: store } = useGetStoreInformation();
  const location = useLocation();

  function isMenuItemSelected(href: string) {
    if (href === "/dashboard" && location.pathname.startsWith("/dashboard/")) {
      return false;
    }
    return location.pathname === href || location.pathname.startsWith(href);
  }

  const menuItems = [
    { href: "/dashboard", title: t("dashboard"), icon: LayoutPanelLeft, key: "Dashboard" },
    { href: "/dashboard/statistic", title: t("statistics"), icon: BsClipboard2Data, key: "Statistic" },
    { href: "/dashboard/payments", title: t("payments"), icon: CiCreditCard1, key: "Payments" },
    { href: "/dashboard/categories", title: t("products"), icon: LuBox, key: "Products" },
    { href: "/dashboard/engagement", title: t("engagement"), icon: LiaUserFriendsSolid, key: "Engagement" },
    { href: "/dashboard/design", title: "Design", icon: MdOutlineDesignServices, key: "Design" },
    { href: "/dashboard/subuser", title: "Sub-usuários", icon: MdCardMembership, key: "SubUser" },
    { href: "/dashboard/settings", title: t("settings"), icon: IoSettingsOutline, key: "Settings" },
    { href: "/dashboard/plan", title: "Plano", icon: Star, key: "Plano" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <ul className="flex-grow overflow-y-auto lg:mt-5 mt-10">
        {menuItems.map(({ href, title, icon: Icon, key }) => (
          <NavLink
            key={key}
            to={href}
            onClick={() => setIsMenuOpen(false)}
            className={`${isMenuItemSelected(href) ? "border-r-4" : ""} w-full group relative hover:bg-muted/70 cursor-pointer transition-all duration-300 border-purple-600 p-3 flex items-center gap-2 text-base`}
          >
            {Icon && <Icon size={21} className="group-hover:text-purple-600 ml-5" />}
            {title}
          </NavLink>
        ))}
      </ul>
      <div className="mt-auto p-4">
        <PlanInfo plan={plan} planLoading={planLoading} />
      </div>
    </div>
  );

  return (
    <AuthProvider>
      <div className="flex flex-col h-screen">
      <nav className="h-[70px] sticky top-0 bg-secondary border-b z-20 flex items-center justify-between px-5">
  <div className="flex items-center gap-4">
    {/* Menu móvel */}
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <button className="lg:hidden">
          <IoMdMenu size={26} className="text-primary cursor-pointer" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <div className="h-full bg-card">
          <SidebarContent />
        </div>
      </SheetContent>
    </Sheet>

    {/* Logo (visível apenas em desktop) */}
    <h1 
      onClick={() => navigate("/")} 
      className="text-purple-600 hidden lg:block text-xl font-bold cursor-pointer"
    >
      &lt;PloudStore/&gt;
    </h1>

    {/* Link da loja (visível apenas em desktop) */}
    <a 
      href="http://localhost:3000/api/auth/renderstore" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-600 hidden lg:block truncate hover:underline"
    >
      {store?.subdomain}.ploudstore.com
    </a>
  </div>

  {/* Ícones à direita */}
  <div className="flex items-center gap-4">
    <button className="text-primary">
      <IoMdNotificationsOutline size={26} />
    </button>
    <UserMenu />
  </div>
</nav>

        <section className="grid h-[calc(100vh-70px)] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
          <div className="hidden md:block bg-card border-r border-border w-full h-full overflow-y-auto">
            <SidebarContent />
          </div>

          <div className="max-h-[calc(100vh-70px)] min-h-[calc(100vh-70px)] border-l overflow-y-auto p-5">
            <Outlet />
          </div>
        </section>
      </div>
    </AuthProvider>
  );
}