import { NavLink, Outlet, useLocation } from "react-router-dom";

const SettingsTabs = [
    {
        name: 'Geral',
        link: '/dashboard/settings',
    },
    {
        name: 'Checkout',
        link: '/dashboard/settings/checkout'
    },
    {
        name: 'Integrações',
        link: '/dashboard/settings/integration'
    },
    {
        name: 'Variaveis',
        link: '/dashboard/settings/variable'
    },
    {
        name: 'Widgets',
        link: '/dashboard/settings/widgets'
    },
    {
        name: 'Domínio',
        link: '/dashboard/settings/domain'
    }
];


export default function SettingsLayout() {
    const location = useLocation();

    function isMenuItemSelected (href: string) {
        // Verificar se a localização atual corresponde ao href ou se começa com o mesmo caminho base
        if (href === '/dashboard/settings' && location.pathname.startsWith('/dashboard/settings/')) {
            return false; // Evita que o item "Dashboard" seja selecionado quando estiver em uma sub-rota de "/dashboard"
        }
        return location.pathname === href || location.pathname.startsWith(href);
    };

    return(
        <>
        <section className="w-full flex flex-wrap  justify-center lg:justify-start mb-10">
                {SettingsTabs.map((tab, index) => (
                        <NavLink key={index} to={tab.link} 
                        className={`${isMenuItemSelected(tab.link) && 'bg-muted/60'} p-3 
                                    border hover:bg-muted/60 
                                    lg:first:rounded-l-lg 
                                    lg:last:rounded-r-md duration-300`}>
                            {tab.name}
                        </NavLink>
                ))}
        </section>
        <Outlet/>
        </>
    )

  }