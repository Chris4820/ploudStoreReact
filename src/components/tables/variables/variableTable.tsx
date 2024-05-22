import { DataTable } from "../../ui/datatable"
import { columns } from "./columns"
import { VariableProps } from "../../../api/req/store/variable";


export default function VariableTable({data}: VariableProps[]) {
  return (
        <DataTable columns={columns} data={data}/>
  )
}
