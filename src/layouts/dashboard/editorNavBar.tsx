
import BackComponent from "../../components/commons/BackComponent";




export default function EditorNavBarLayout() {
    return(
        <div className="h-[70px] sticky bg-secondary border-b">
        <div className="mx-5 h-full flex justify-between items-center">
          <div className="flex gap-2 items-center">
                <BackComponent toLink="/dashboard" text="Sair do editor"/>
                <div className="bg-purple-600/35 text-sm font-semibold rounded-md px-2 py-1">Beta</div>
          </div>
          <div className="flex gap-3 items-center">
            
          </div>
        </div>
        
      </div>
    )
}