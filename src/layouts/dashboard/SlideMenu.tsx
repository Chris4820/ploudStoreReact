import { BsClipboard2Data } from "react-icons/bs";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoMdMenu, IoMdNotificationsOutline } from "react-icons/io";
import { CiCreditCard1 } from "react-icons/ci";
import UserMenu from "./UserMenu";
import { IoCloseCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { useGetStoreInformation } from "../../features/stores/api/store/store";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { t } from "i18next";
import { LuBox } from "react-icons/lu";
import { MdOutlineDesignServices } from "react-icons/md";
import { useState } from "react";
import { AuthProvider } from "../../provider/AuthProvider";
import { useGetPlan } from "../../features/home/api/store/store";
import PlanInfo from "./PlanCard";
import { LayoutPanelLeft, Star } from "lucide-react";

export default function DashboardLayout() {
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false);

  const { data: plan, isLoading: planLoading } = useGetPlan();
  const navigate = useNavigate();

  const { data: store } = useGetStoreInformation();
  const location = useLocation();

  const handletoggleMobileMenu = () => {
    setIsMenuMobileOpen(!isMenuMobileOpen);
  };

  function handleOpenMenu() {
    if (isMenuMobileOpen) {
      setIsMenuMobileOpen(false);
    }
  }

  function isMenuItemSelected(href: string) {
    // Verificar se a localização atual corresponde ao href ou se começa com o mesmo caminho base
    if (href === "/dashboard" && location.pathname.startsWith("/dashboard/")) {
      return false; // Evita que o item "Dashboard" seja selecionado quando estiver em uma sub-rota de "/dashboard"
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
    { href: "/dashboard/settings", title: t("settings"), icon: IoSettingsOutline, key: "Settings" },
    {  href: "/dashboard/plan", title: "Plano", icon: Star, key: "Plano" },
  ];

  return (
    <AuthProvider>
      <div className="flex flex-col h-screen">
        {/* Top Navigation */}
        <nav className="h-[70px] sticky bg-secondary border-b z-20 flex items-center justify-between px-5">
          <div className="flex items-center gap-4">
            {isMenuMobileOpen ? (
              <IoCloseCircleOutline onClick={handletoggleMobileMenu} size={26} className="text-primary lg:hidden cursor-pointer" />
            ) : (
              <IoMdMenu onClick={handletoggleMobileMenu} size={26} className="text-primary lg:hidden cursor-pointer" />
            )}
            <h1 onClick={() => navigate("/")} className="text-purple-600 hidden lg:flex text-xl font-bold cursor-pointer">
              &lt;PloudStore/&gt;
            </h1>
            <a href="http://localhost:3000/api/auth/renderstore" target="_blank" className="text-blue-600 hidden lg:flex truncate">
              {store?.subdomain}.ploudstore.com
            </a>
          </div>
          <div className="flex gap-3 items-center">
            <IoMdNotificationsOutline className="text-primary" size={30} />
            <UserMenu />
          </div>
        </nav>

        {/* Main Section */}
        <section className="grid h-[calc(100vh-70px)] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
          {/* Sidebar */}
          <div
            className={`${
              isMenuMobileOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-all bg-card border-r border-border w-full fixed md:relative z-30 h-full overflow-y-auto duration-500`}
          >
            <ul className="mt-3 mb-[180px]"> {/* Ajuste para evitar sobreposição com o box de plano */}
              {menuItems.map(({ href, title, icon: Icon, key }) => (
                <NavLink
                  key={key}
                  to={href}
                  onClick={handleOpenMenu}
                  className={`${isMenuItemSelected(href) ? "border-r-4" : ""} w-full group relative hover:bg-secondary cursor-pointer transition-all duration-300 border-purple-600 p-3 flex items-center gap-2 text-base`}
                >
                  {Icon && <Icon size={21} className="group-hover:text-purple-600 ml-5" />}
                  {title}
                </NavLink>
              ))}
            </ul>

            {/* Plano Box fixado no rodapé */}
            <PlanInfo plan={plan} planLoading={planLoading}/>
          </div>

          {/* Content Section */}
          <div className="max-h-[calc(100vh-70px)] min-h-[calc(100vh-70px)] border-l overflow-y-auto p-5">
            <Outlet />
          </div>
        </section>
      </div>
    </AuthProvider>
  );
}
