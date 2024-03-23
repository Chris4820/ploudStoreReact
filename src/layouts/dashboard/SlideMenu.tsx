import { BsClipboard2Data } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { NavLink, Outlet } from "react-router-dom";
import { IoMdMenu, IoMdNotificationsOutline } from "react-icons/io";
import { CiCreditCard1 } from "react-icons/ci";
import UserMenu from "./UserMenu";
import { IoSettingsOutline } from "react-icons/io5";
import { useGetStoreInformation } from "../../api/store/store";





const menuItems = [
  { href: '/dashboard', title: 'Dashboard', icon: RxDashboard },
  { href: '/dashboard/about', title: 'Statistic', icon: BsClipboard2Data },
  { href: '/dashboard/payments', title: 'Payments', icon: CiCreditCard1},
  { href: '/dashboard/settings', title: 'Settings', icon: IoSettingsOutline},
];


export default function Layout() {
  const {data:store} = useGetStoreInformation();
  
  console.log(store);
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
            {menuItems.map(({ href, title, icon: Icon }) => (
                <NavLink to={href} className="w-full group relative hover:bg-card hover:border-r-4 hover:cursor-pointer duration-300 font-semibold border-purple-600 p-3 flex items-center gap-2 text-base">
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