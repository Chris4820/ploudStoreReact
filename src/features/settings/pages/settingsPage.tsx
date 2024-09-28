import { useGetStoreSettings } from "../../stores/api/store/store";
import HeaderSection from "../../../components/commons/Header";
import NotFoundComponent from "../../../containers/404Component";
import LoadingComponent from "../../../containers/LoadingComponent";
import SettingsForm from "../components/SettingsForm";
import { useUpdateSettings } from "../mutation/updateSettingsMutation";
import type { SettingsFormData } from "../schema/SettingsSchema";


export default function SettingsPage() {


    const {data: settings, isLoading} = useGetStoreSettings();
    const { mutate: updateSettings, isPending } = useUpdateSettings();

    async function onSubmitUpdateSettings(data: SettingsFormData) {
        updateSettings(data);
    }

    if(isLoading) {
        return <LoadingComponent/>
    }

    if(!settings) {
        return <NotFoundComponent title="Sem settings" description="Ocorreu um problema!"/>
    }

    return(
        <>
            <HeaderSection title="Definições" description="Configure as definições gerais aqui"/>
            <section className="border rounded-lg p-5 space-y-5">
                <SettingsForm isLoading={isPending} initialData={settings} onSubmit={onSubmitUpdateSettings}/>
            </section>
        </>
    );
}
