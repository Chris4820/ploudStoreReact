import { DataTable } from "../../ui/datatable"
import { columns } from "./columns"
import { useGetPayments } from "../../../api/store/store";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../ui/button";

export default function PaymentTableBig() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

    const { data, isLoading } = useGetPayments();

  function handleNextPage() {
      setSearchParams({ page: page + 1});
  }

  return (
    <>
        <DataTable columns={columns} data={data || []}/>
        <Button onClick={() => handleNextPage()}></Button>
        </>
  )
}
