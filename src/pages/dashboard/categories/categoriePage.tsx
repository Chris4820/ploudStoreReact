import HeaderSection from "../../../components/commons/Header";
import { CategorieSection } from "../../../containers/dashboard/categories/CategorieSection";
import { Button } from "../../../components/ui/button";
import { DialogCreateCategorie } from "../../../containers/modal/categorie/modalCreateCategorie";
import { MdOutlineAddCircle } from "react-icons/md";

export default function CategoriePage() {

  return (
    <>
      <div className="flex items-center justify-between">
        <HeaderSection title="Categorias" description="Crie categorias e arraste-as" />
        <DialogCreateCategorie>
        <Button className="gap-1 items-center">
            <MdOutlineAddCircle className="mt[1px]" size={18}/>
            Categoria
        </Button>
        </DialogCreateCategorie>
      </div>
      <section className="container border rounded-lg space-y-1 py-5">
        <CategorieSection />
      </section>
    </>
  );
}
