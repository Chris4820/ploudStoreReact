import ButtonLink from "../../../components/commons/buttons/ButtonLink";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import HeaderSection from "../../../components/commons/Header";
import { Card, CardContent} from "../../../components/ui/card";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useGetCustomPages } from "../api/store";
import PagesDragComponent from "../components/PagesDragComponent";

export default function CustomPageIndex() {
  const {data: customPages, isLoading} = useGetCustomPages();

  return(
    <section>
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
          <Card>
            <CardContent className="my-5">
              <CardEmptyComponent
                title="Nenhuma página encontrada"
                description="Comece criando uma nova página personalizada"
              />
          </CardContent>
          </Card>
      ) : (
        <PagesDragComponent items={customPages} />
      )}
      </div>
    </section>
  )
}