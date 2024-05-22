import HeaderSection from "../../../components/commons/Header";
import VariableForm from "../../../containers/dashboard/forms/variableForm";




export default function CreateVariablePage() {
    return(
        <>
        <HeaderSection title="Variáveis" description="Gerencie as variáveis de sua loja"/>
        <section className="border rounded-lg p-5">
            <VariableForm/>
        </section>
        </>
    )
}