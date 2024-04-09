import CardEmptyComponent from "../../../../components/commons/CardEmpty";
import HeaderSection from "../../../../components/commons/Header";
import SubHeaderSection from "../../../../components/commons/subHeader";



export default function TemplatePage() {
    return(
        <>
            <HeaderSection 
            title="Templates"
            description="Gerencie o template de sua loja!"/>
            <div className="mt-5">
                <SubHeaderSection title="Templates públicos" description="Escolha o template que mais combine com sua loja!"/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-5">
                    <div className="h-[300px] border rounded-md">

                    </div>
                    <div className="h-[300px] border rounded-md">

                    </div>
                    <div className="h-[300px] border rounded-md">

                    </div>
                    <div className="h-[300px] border rounded-md">

                    </div>
                    <div className="h-[300px] border rounded-md">

                    </div>
                </div>
            </div>

            <div className="mt-5">
                <SubHeaderSection title="Seus templates" description="Crie e gerencie seus próprios templates com nosso editor de código"/>
                <div className="w-full border p-5">
                    <CardEmptyComponent title="Sem templates" desc="Você não tem templates"/>
                </div>
            </div>
        </>
    )
}