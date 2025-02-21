import { LockIcon } from "lucide-react"
import { Button } from "../../../components/ui/button"
import HeaderSection from "../../../components/commons/Header"
import { t } from "i18next"
import SubDomainForm from "../../../features/domain/components/SubDomainForm"
import { useUpdateSubDomain } from "../../../features/domain/mutation/ChangeSubDomainMutation"
import { useNavigate } from "react-router-dom"
import { useStore } from "../../../provider/Store/StoreContext"



export default function DomainPage() {
    const navigate = useNavigate();
    const store = useStore();
    const { mutate: updateSubDomain, isPending} = useUpdateSubDomain();

    return(
        <>
        <HeaderSection title={t("settingsPage.domainSection.domain")} description={t("settingsPage.domainSection.description")}/>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
          <div>
            <div className="border bg-card rounded-lg p-5 lg:h-36 flex flex-wrap lg:flex-nowrap justify-between items-center gap-10">
              <div>
                <h1 className="font-semibold text-base">{t("settingsPage.domainSection.configureDomain.title")}</h1>
                  <p className="text-sm text-muted-foreground">{t("settingsPage.domainSection.configureDomain.description")}</p>
              </div>
          <Button onClick={() => navigate('custom')}>{t("configure")}</Button>  
        </div>
                <SubDomainForm isPending={isPending} onSubmit={(data) => updateSubDomain(data)} initialData={store}/>
            </div>
            <div className="border bg-card rounded-lg p-5 flex justify-between lg:h-36 mb-10 xl:mb-0">
                <div className="space-y-2">
                    <h1 className="font-semibold">HTTPS</h1>
                    <p className="text-muted-foreground text-sm">{t("settingsPage.domainSection.configureHttps.description")}</p>
                    <div className="text-green-600 flex gap-2 items-center mt-2">
                        <LockIcon/>
                        <p>{t("settingsPage.domainSection.configureHttps.footer")}</p>
                    </div>
                </div>
                
            </div>
        </div>
        
        </>
    )
}