import { Moon, Sun } from "lucide-react";
import { UseUpdateTheme } from "../../features/user/mutation/ChangeThemeMutation";
import { useTheme, type Theme } from "../../layouts/providers/Theme";
import { useUser } from "../../provider/User/UserContext";
import { DropdownMenuItem } from "../ui/dropdown-menu";





export default function ChangeThemeComponent() {
  const user = useUser();
  const { mutate: updateTheme} = UseUpdateTheme();
  const { setTheme , theme} = useTheme();

  const initialTheme = (user.theme?.toLowerCase() as Theme) || "light";
      if (theme !== initialTheme) {
        setTheme(initialTheme);
      }
  
    async function changeTheme() {
          let newTheme = 'light';
          // Alternar o tema imediatamente no frontend
          if(theme as Theme) {
            newTheme = theme === "dark" ? "light" : "dark";
          }
          
          // Atualizar o backend em segundo plano
          updateTheme(newTheme.toUpperCase() as Theme);
    }


    return (
      <DropdownMenuItem onClick={() => changeTheme()}>
                {user.theme === 'DARK' ? (
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
    )
}  