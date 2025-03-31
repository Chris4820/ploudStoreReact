import HeaderSection from "../../../components/commons/Header";
import { useGetCustomPages } from "../api/store";
import ButtonLink from "../../../components/commons/buttons/ButtonLink";
import LoadingComponent from "../../../containers/LoadingComponent";
import PagesDragComponent from "../components/PagesDragComponent";








export default function CustomPageIndex() {

  const {data: customPages, isLoading} = useGetCustomPages();


  if(isLoading) {
    return <LoadingComponent/>
  }


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
      {/* Cabeçalho permanece igual */}
        {isLoading && <LoadingComponent/>}
        <PagesDragComponent items={customPages || []} />
    </>
  )
}