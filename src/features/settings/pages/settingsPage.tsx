import HeaderSection from "../../../components/commons/Header";
import { useStore } from "../../../provider/Store/StoreContext";
import SettingsForm from "../components/SettingsForm";
import { useUpdateSettings } from "../mutation/updateSettingsMutation";
import type { SettingsFormData } from "../schema/SettingsSchema";


export default function SettingsPage() {


    const store = useStore();
    const { mutate: updateSettings, isPending } = useUpdateSettings();

    async function onSubmitUpdateSettings(data: SettingsFormData) {
        updateSettings(data);
    }


    return(
        <>
            <HeaderSection title="Definições" description="Configure as definições gerais aqui"/>
            <section className="border rounded-lg p-5 space-y-5">
                <SettingsForm isLoading={isPending} 
                    initialData={
                        {
                            name: store.name,
                            description: store.description,
                            keywords: store.description,
                            terms: store.terms,
                            currency: store.currency,
                            locale: store.locale,
                            maintenance: store.maintenance,
                            minBasket: store.minBasket,
                        }
                    } 
                    onSubmit={onSubmitUpdateSettings}/>
            </section>
        </>
    );
}
