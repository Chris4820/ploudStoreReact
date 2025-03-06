import HeaderSection from "../../../components/commons/Header";
import { useNavigate } from "react-router-dom";
import CreateButtonComponent from "../../../components/commons/buttons/CreateButton";
import { CategorieSection } from "../components/CategorieSection";
import { t } from "../../../lib/reacti18next/i18n";

export default function CategoriePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between">
        <HeaderSection title={t("categories")} description={t("categoriesPage.description")} />
        <CreateButtonComponent
          title={t("category")}
          onClick={() => navigate('/dashboard/categories/create')}/>
      </div>
      <section className="container border rounded-lg space-y-1 py-5">
        <CategorieSection parentCategoryId={undefined} />
      </section>
    </>
  );
}
