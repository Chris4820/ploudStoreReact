import HeaderSection from "../../components/commons/Header";
import SettingsFormContainer from '../../containers/dashboard/forms/settingsFormContainer';


export default function SettingsPage() {
    return(
        <>
            <HeaderSection title="Definições" description="Configure as definições gerais aqui"/>
            <section className="border rounded-lg p-5 space-y-5">
                <SettingsFormContainer/>
            </section>
        </>
    );
}
