import { DataTable } from "../../ui/datatable"
import { columns } from "./columns"
import { useGetPayments } from "../../../api/store/store";
import LoadingComponent from "../../../containers/LoadingComponent";

export default function PaymentTableBig() {

    const { data, isLoading } = useGetPayments();

    if(isLoading) {
      return <LoadingComponent/>
    }
  return (
    <>
        <DataTable columns={columns} data={data || []}/>
        </>
  )
}
