import { LockIcon } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import HeaderSection from "../../components/commons/Header"



export default function DomainPage() {
    return(
        <>
        <HeaderSection title="Domínio" description="Gerencie aqui o seu domínio"/>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
        <div>
                <div className="border bg-card rounded-lg p-5 lg:h-36 flex flex-wrap lg:flex-nowrap justify-between items-center gap-10">
                    <div>
                        <h1 className="font-semibold text-base">Configure o seu domínio</h1>
                        <p className="text-sm text-muted-foreground">Use seu próprio nome de domínio em sua loja virtual para combinar com sua própria marca.</p>
                    </div>
                    <Button>Configurar</Button>
                    
                </div>
                <div className="border bg-card rounded-lg p-5 mt-5 h-auto space-y-5">
                    <div>
                        <h1 className="font-semibold text-base">Configure o sub-domínio</h1>
                        <p className="text-sm text-muted-foreground">O endereço da marca PloudStore usado para acessar sua loja virtual.</p>
                    </div>
                    <div className="flex justify-between flex-wrap gap-10 items-center">
                        <div className="w-full flex">
                            <div className="hidden sm:flex h-10 items-center justify-center rounded-s-md border px-4 text-muted-foreground bg-muted">https://</div>
                            <Input className="rounded-none"/>
                            <div className="hidden sm:flex h-10 items-center justify-center rounded-e-md border px-4 text-muted-foreground bg-muted">.ploudstore.com</div>
                        </div>
                        <small className="sm:hidden mt-[-2.5rem] text-[12px] text-muted-foreground"><span className="font-semibold text-green-600">YourStoreName</span>.ploudstore.com</small>
                        <Button>Salvar</Button>
                    </div>
                    
                </div>
            </div>
            <div className="border bg-card rounded-lg p-5 flex justify-between lg:h-36 mb-10 xl:mb-0">
                <div className="space-y-2">
                    <h1 className="font-semibold">HTTPS</h1>
                    <p className="text-muted-foreground text-sm">Sua loja está protegida por um certificado SSL para manter todos os dados pessoais seguros.</p>
                    <div className="text-green-600 flex gap-2 items-center mt-2">
                        <LockIcon/>
                        <p>Seguro e criptografado</p>
                    </div>
                </div>
                
            </div>
        </div>
        
        </>
    )
}