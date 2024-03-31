import { BsClipboard2Data } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { IoMdMenu, IoMdNotificationsOutline } from "react-icons/io";
import { CiCreditCard1 } from "react-icons/ci";
import UserMenu from "./UserMenu";
import { IoSettingsOutline } from "react-icons/io5";
import { useGetStoreInformation } from "../../api/store/store";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { t } from "i18next";
import { LuBox } from "react-icons/lu";
import { MdOutlineDesignServices } from "react-icons/md";







export default function Layout() {

  const { data: store } = useGetStoreInformation();

  const location = useLocation();

  function isMenuItemSelected (href: string) {
    // Verificar se a localização atual corresponde ao href ou se começa com o mesmo caminho base
    if (href === '/dashboard' && location.pathname.startsWith('/dashboard/')) {
        return false; // Evita que o item "Dashboard" seja selecionado quando estiver em uma sub-rota de "/dashboard"
    }
    return location.pathname === href || location.pathname.startsWith(href);
};
  
  
  const menuItems = [
    { href: '/dashboard', title: t("dashboard"), icon: RxDashboard, key: "Dashboard" },
    { href: '/dashboard/statistic', title: t("statistics"), icon: BsClipboard2Data, key: "Statistic" },
    { href: '/dashboard/payments', title: t("payments"), icon: CiCreditCard1 , key: "Payments"},
    { href: '/dashboard/categorie', title: t("products"), icon: LuBox, key: "Products"},
    { href: '/dashboard/engagement', title: t("engagement"), icon: LiaUserFriendsSolid, key: "Engagement"},
    { href: '/dashboard/design', title: 'Design', icon: MdOutlineDesignServices, key: "Design"},
    { href: '/dashboard/settings', title: t("settings"), icon: IoSettingsOutline, key: "Settings"},
  ];
   return (
    <div className="max-h-screen max-w-screen overflow-hidden bg-background">
      <div className="h-[70px] sticky bg-secondary border-b">
        <div className="mx-5 h-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <IoMdMenu size={26} className="text-primary lg:hidden cursor-pointer"/>
          <h1 className="text-purple-600 text-xl font-bold">&lt;PloudStore/&gt;</h1>
          <p className="text-blue-600">{store?.subdomain}</p>
          </div>
          <div className="flex gap-3 items-center">
            <IoMdNotificationsOutline className="text-primary" size={30}/>
            <UserMenu/>
          </div>
        </div>
        
      </div>
      <section className="grid h-[calc(100vh-70px)] grid-cols-1 lg:grid-cols-[240px,1fr] 3xl:grid-cols-[270px,1fr] overflow-hidden">
        <div className="overflow-y-auto hidden lg:block bg-">
            <ul className="mt-3">
            {menuItems.map(({ href, title, icon: Icon, key }) => (
                <NavLink key={key} to={href} 
                className={`${isMenuItemSelected(href) && 'border-r-4'} w-full group relative hover:bg-muted hover:cursor-pointer duration-300 font-semibold border-purple-600 p-3 flex items-center gap-2 text-base`}>
                  {Icon && <Icon size={21} className="group-hover:text-purple-600 ml-5" />} {/* Renderizar o ícone se estiver disponível */}
                  {title}
                </NavLink>
            ))}
            </ul>
        </div>
        <div className="p-5 overflow-y-auto border-l">
          <Outlet/>
        </div>
      </section>
      
    </div>
   );
}