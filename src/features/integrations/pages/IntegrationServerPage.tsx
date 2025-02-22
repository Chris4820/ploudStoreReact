import MinecraftIntegrationSection from "../components/MinecraftIntegrationSection";
import FiveMIntegrationSection from "../components/FivemIntegrationSection";
import { useStore } from "../../../provider/Store/StoreContext";







export default function IntegrationServerPage() {


  const store = useStore();


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