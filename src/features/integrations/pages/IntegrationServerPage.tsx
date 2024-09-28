import { useGetStoreInformation } from "../../stores/api/store/store";
import LoadingComponent from "../../../containers/LoadingComponent";
import MinecraftIntegrationSection from "../components/MinecraftIntegrationSection";
import FiveMIntegrationSection from "../components/FivemIntegrationSection";







export default function IntegrationServerPage() {


  const { data: store, isLoading } = useGetStoreInformation();

  if(isLoading) {
    return <LoadingComponent/>
  }

  if(!store) {
    return (
      <h1>Ocorreu um problema, loja nao encontrada!</h1>
    )
  }

  return(
    <>
    {store.gameType === "MINECRAFT" ? (
      <MinecraftIntegrationSection/>
    ) : store.gameType === "FIVEM" ? (
      <FiveMIntegrationSection/>
    ) : (
      <h1>Tipo de jogo não encontrado</h1>
    )}
    </>
  )
}