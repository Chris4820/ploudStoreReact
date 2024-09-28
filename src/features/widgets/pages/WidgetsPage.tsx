import { useNavigate } from "react-router-dom";
import CreateButtonComponent from "../../../components/commons/buttons/CreateButtonComponent";
import HeaderSection from "../../../components/commons/Header";
import { WidgetsSection } from "../components/WidgetsSection";



export default function WidgetsPage() {
  const navigate = useNavigate();

  return(
    <>
      <div className="flex items-center justify-between">
        <HeaderSection title="Widgets" description="Crie widgets e orderne-os" />
        <CreateButtonComponent
          title="Widget"
          onClick={() => navigate('edit')}/>
      </div>
      <section className="container border rounded-lg space-y-1 py-5">
        <WidgetsSection/>
      </section>

    </>
  )
}



