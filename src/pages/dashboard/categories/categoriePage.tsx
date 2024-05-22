import HeaderSection from "../../../components/commons/Header";
import { CategorieSection } from "../../../containers/dashboard/categories/CategorieSection";
import { useNavigate } from "react-router-dom";
import CreateButtonComponent from "../../../components/commons/buttons/CreateButtonComponent";

export default function CategoriePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between">
        <HeaderSection title="Categorias" description="Crie categorias e arraste-as" />
        <CreateButtonComponent
          title="Categoria"
          onClick={() => navigate('/dashboard/category/create')}/>
      </div>
      <section className="container border rounded-lg space-y-1 py-5">
        <CategorieSection parentCategoryId={null} />
      </section>
    </>
  );
}
