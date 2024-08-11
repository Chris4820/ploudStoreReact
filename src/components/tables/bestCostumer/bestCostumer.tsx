import { useSearchParams } from "react-router-dom";
import { DataTable } from "../../ui/datatable"
import { columns } from "./columns"
import { CustomersData, MetaProps } from "../../../api/req/store/statistic";
import Pagination from "../../ui/pagination";






type BestCategoriesTable = {
  meta?: MetaProps,
  customers: CustomersData[],
  isLoading: boolean,
}



export default function BestCostumerTable({meta, customers, isLoading} : BestCategoriesTable) {


    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    return (
      <>
          <DataTable columns={columns} data={customers} loading={isLoading}/>
          {meta && (
          <Pagination items={meta.items} pages={meta.pages} page={page} />
        )}
      </>
    )
}
