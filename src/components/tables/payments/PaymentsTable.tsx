import { useSearchParams } from "react-router-dom";
import { PaymentProps } from "../../../api/req/store/payment";
import { MetaProps } from "../../../api/req/store/statistic";
import { DataTable } from "../../ui/datatable";
import { columns } from "./columns";
import Pagination from "../../ui/pagination";





type PaymentTableProps = {
  meta?: MetaProps,
  payments: PaymentProps[],
  isLoading: boolean,
}


export default function PaymentTable({meta, payments, isLoading} : PaymentTableProps) {

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const email = searchParams.get('email') ? Number(searchParams.get('email')) : null;
  const filter = searchParams.get('filter') ? Number(searchParams.get('filter')) : null;
  const status = searchParams.get('status') ? Number(searchParams.get('status')) : null;

  return (
        <>
          <DataTable columns={columns} data={payments} loading={isLoading}/>
          {meta && (
            <Pagination items={meta.items} pages={meta.pages} page={page}/>
          )}
        </>
  )
}
