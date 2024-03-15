import { NavLink, Outlet, useLocation } from "react-router-dom";

const SettingsTabs = [
    {
        name: 'Geral',
        link: '/dashboard/settings',
    },
    {
        name: 'Templates',
        link: '#'
    },
    {
        name: 'Checkout',
        link: '#'
    },
    {
        name: 'Integrações',
        link: '/dashboard/settings/integration'
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

    return(
        <>
        <section className="w-full flex flex-wrap  justify-center lg:justify-start mb-10">
                {SettingsTabs.map((tab, index) => (
                        <NavLink key={index} to={tab.link} 
                        className={`${location.pathname === tab.link ? 'bg-muted/60' : ''} p-3 
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