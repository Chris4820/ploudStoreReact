import { useNavigate } from "react-router-dom";
import HeaderSection from "../../../components/commons/Header";
import { useGetVariables } from "../api/store/VariablesStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import LoadingComponent from "../../../containers/LoadingComponent";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import CreateButtonComponent from "../../../components/commons/buttons/CreateButton";







export default function VariablesPage() {
  const navigate = useNavigate();

  const { data: variables, isLoading} = useGetVariables();

  return(
    <>
      <div className="flex justify-between items-center">
        <HeaderSection title="Variaveis" description="Crie variaveis para seus produtos"/>
        <CreateButtonComponent title="Variavel" onClick={() => navigate("create")}/>
      </div>
      <Table className="mt-5">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Variavel</TableHead>
            <TableHead className="text-right">Criado em</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow className="hover:bg-transparent">
              <TableHead colSpan={3} className="text-center">
                <LoadingComponent />
              </TableHead>
            </TableRow>
          ) : !variables || variables.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableHead colSpan={3} className="text-center">
                <CardEmptyComponent title="Sem variaveis" description="Parece que ainda não existem variaveis"/>
              </TableHead>
            </TableRow>
          ) : (
            variables.map((variable, index) => (
              <TableRow className="cursor-pointer" key={index} onClick={() => navigate(`edit/${variable.id}`)}>
                <TableCell>{variable.slug}</TableCell>
                <TableCell className="text-right">{new Date(variable.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</TableCell>
              </TableRow>
          ))
        )}
</TableBody>

      </Table>
    </>
  )
}