import ButtonLink from "../../../components/commons/buttons/ButtonLink";
import HeaderSection from "../../../components/commons/Header";
import NotFoundComponent from "../../../containers/404Component";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useGetCustomPages } from "../api/store";
import PagesDragComponent from "../components/PagesDragComponent";

export default function CustomPageIndex() {
  const {data: customPages, isLoading} = useGetCustomPages();

  return(
    <>
      <div className="flex justify-between items-center">
        <HeaderSection
          title="Páginas customizadas"
          description="Crie ou edite as suas páginas"/>
        <ButtonLink
          to="create"
          text="Página"
          type="CREATE">
        </ButtonLink>
      </div>
      <div className="my-4">
      {isLoading ? (
        <LoadingComponent/>
      ) : (!customPages || customPages.length === 0) ? (
          <NotFoundComponent
            title="Nenhuma página encontrada"
            description="Comece criando uma nova página personalizada"
          />
      ) : (
        <PagesDragComponent items={customPages} />
      )}
      </div>
    </>
  )
}