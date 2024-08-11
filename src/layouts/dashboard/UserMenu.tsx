import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { useGetUserInformation } from "../../api/store/user";
import { useTheme } from "../providers/Theme";
import { PopoverClose } from "@radix-ui/react-popover";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { logout } from "../../api/req/auth";




export default function UserMenu() {
    const navigate = useNavigate();
    const { setTheme , theme} = useTheme();

    const {data: userInformation} = useGetUserInformation();
    console.log("userInformation: " + userInformation);


    async function logoutUser() {
      await logout();
      return navigate("/auth/login")
    }


    function changeTheme() {
        if(theme === "dark") {
            setTheme("light");
            return;
        }
        setTheme("dark");
    }
    return(
        <Popover>
                <PopoverTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </PopoverTrigger>
              <PopoverContent className="w-auto mr-2">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-base leading-none">{userInformation?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {userInformation?.email}
                    </p>
                  </div>
                  <hr/>
                  <div className="grid gap-2">
                    <ul className="space-y-1">
                      <li>
                        <Button onClick={() => navigate('/profile')} className="w-full" variant={"ghost"}>Ver perfil</Button>
                      </li>
                      <li>
                        <PopoverClose className="w-full">
                            <Button 
                            onClick={() => changeTheme()} 
                            className="w-full gap-2" variant={"ghost"}>
                                {theme === "dark" ? (
                                    <IoSunnyOutline size={20}/>
                                ): (
                                    <IoMoonOutline size={20}/>
                                )}
                                Mudar tema
                            </Button>
                        </PopoverClose>
                      </li>
                      <li>
                          <Button onClick={() => logoutUser()} className="w-full" variant={"ghost"}>Sair da conta</Button>
                      </li>
                    </ul>
                    </div>
                </div>
              </PopoverContent>
            </Popover>
    )
}