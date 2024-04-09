import { IoMdMenu, IoMdNotificationsOutline } from "react-icons/io";
import UserMenu from "./UserMenu";
import BackComponent from "../../components/commons/BackComponent";
import { Button } from "../../components/ui/button";




export default function EditorNavBarLayout() {
    return(
        <div className="h-[70px] sticky bg-secondary border-b">
        <div className="mx-5 h-full flex justify-between items-center">
          <div className="flex gap-2 items-center">
                <BackComponent toLink="/dashboard" text="Sair do editor"/>
                <div className="bg-purple-600/35 text-sm font-semibold rounded-md px-2 py-1">Beta</div>
          </div>
          <div className="flex gap-3 items-center">
            <UserMenu/>
          </div>
        </div>
        
      </div>
    )
}