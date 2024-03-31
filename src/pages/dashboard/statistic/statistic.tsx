import { GiMoneyStack } from "react-icons/gi";
import HeaderSection from "../../../components/commons/Header";
import Cards from "../../../components/dashboard/DashboardCard";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import NextComponent from "../../../components/commons/NextComponent";




export default function StatisticPage() {
    return(
        <>
        <HeaderSection title={'Estatística'} description="Veja detalhadamente o caminho de sua loja"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Cards
            title={"Vendas de sempre"}
            symbol="€"
            price={0}
            icon={GiMoneyStack}
          />
          <Cards
            title={"Vendas do ano"}
            symbol="€"
            price={0}
            icon={GiMoneyStack}
          />
          <Cards
            title={"Vendas do mês"}
            symbol="€"
            price={0}
            icon={GiMoneyStack}
          />
          <Cards
            title={"Vendas do dia"}
            symbol="€"
            price={0}
            icon={GiMoneyStack}
          />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                <div>
                    <div className="flex items-center justify-between">
                        <label className="block font-medium mb-1">Categoria mais popular</label>
                        <NextComponent text="Ver mais" toLink="#"/>
                    </div>
                    <div className="bg-muted rounded-t-md flex justify-between items-center p-2">
                        <h1>Categoria</h1>
                        <h1>Compras</h1>
                        <h1>Valor</h1>
                    </div>
                    <div className="border rounded-b-md py-4">
                        <CardEmptyComponent title="Sem categorias" desc="Não existe dados suficientes para exibir esta estatística."/>
                    </div>
                    <div>

                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label className="block font-medium mb-1">Cliente mais popular</label>
                        <NextComponent text="Ver mais" toLink="#"/>
                    </div>
                    <div className="bg-muted rounded-t-md flex justify-between items-center p-2">
                        <h1>Cliente</h1>
                        <h1>Compras</h1>
                        <h1>Valor</h1>
                    </div>
                    <div className="border rounded-b-md py-4">
                        <CardEmptyComponent title="Sem Clientes" desc="Não existe dados suficientes para exibir esta estatística."/>
                    </div>
                    <div>

                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                <div>
                    <div className="flex items-center justify-between">
                        <label className="block font-medium mb-1">Produtos mais popular</label>
                        <NextComponent text="Ver mais" toLink="#"/>
                    </div>
                    <div className="bg-muted rounded-t-md flex justify-between items-center p-2">
                        <h1>Produto</h1>
                        <h1>Compras</h1>
                        <h1>Valor</h1>
                    </div>
                    <div className="border rounded-b-md py-4">
                        <CardEmptyComponent title="Sem Produtos" desc="Não existe dados suficientes para exibir esta estatística."/>
                    </div>
                    <div>

                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label className="block font-medium mb-1">Servidores mais popular</label>
                        <NextComponent text="Ver mais" toLink="#"/>
                    </div>
                    <div className="bg-muted rounded-t-md flex justify-between items-center p-2">
                        <h1>Servidor</h1>
                        <h1>Compras</h1>
                        <h1>Valor</h1>
                    </div>
                    <div className="border rounded-b-md py-4">
                        <CardEmptyComponent title="Sem Servidores" desc="Não existe dados suficientes para exibir esta estatística."/>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    )
}