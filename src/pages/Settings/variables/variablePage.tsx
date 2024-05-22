import { useGetVariables } from "../../../api/store/store/variables";
import HeaderSection from "../../../components/commons/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import LoadingComponent from "../../../containers/LoadingComponent";



export default function VariablePage() {
    const {data: variables, isLoading} = useGetVariables();

    if(isLoading) {
        return <LoadingComponent/>
    }

    return(
        <>
        <HeaderSection title="Variaveis" description="Gerencie as variaveis de sua loja"/>
        <div className="rounded-md border">
      <Table>
        <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nome</TableHead>
          <TableHead>Variavel</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
            {variables && variables?.length > 0 ? (
                variables.map((variable) => (
            <TableRow key={variable.variableId}>
            <TableCell className="font-medium">{variable.name}</TableCell>
            <TableCell>{variable.variable}</TableCell>
        </TableRow>
    ))
) : (
    <h1>Sem items</h1>
)}
        
      </TableBody>
      </Table>
    </div>
        </>
    )
}