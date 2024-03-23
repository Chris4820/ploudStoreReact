import { Outlet } from "react-router-dom";



export default function AuthLayout() {
    return (
      <section className="h-screen w-screen bg-gradient-to-tr dark:from-blue-900 dark:via-purple-600 dark:to-purple-900 from-blue-600 via-purple-400 to-purple-600 flex justify-center items-center">
        <div className="w-full min-h-[400px] relative mx-5 lg:mx-0 sm:max-w-2xl lg:max-w-[900px] lg:w-[900px] bg-card rounded-xl grid lg:grid-cols-2 p-9">
            <div className="h-full w-full justify-center items-center hidden lg:flex flex-col">
                <div className="relative h-full w-full flex">
                    <img src={'/LoginMobile.svg'} alt="AuthLogo"/>
                </div>
                <h1 className="text-purple-600 text-center lg:max-w-sm font-semibold">Monetize seu servidor de jogos com nossa plataforma avançada de comércio eletrônico</h1>
                
            </div>
            <Outlet/>
        </div>

      </section>
    )
  }