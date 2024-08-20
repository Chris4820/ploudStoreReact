import { useState } from "react";
import { useGetTopCustomersData } from "../../../api/store/store/statistic";
import { columnsCustomer } from "./customersColumns";
import { DatePickerWithRange } from "../../../components/ui/datepicker";
import HeaderSection from "../../../components/commons/Header";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/datatable";
import { useSearchParams } from "react-router-dom";




export default function CustomersPage() {

    const [searchParams] = useSearchParams();


    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const [startDate, setStartDate] = useState();
    const [currentStartDate,] = useState();
    const [endDate, setEndDate] = useState();
    const [currentEndDate,] = useState();

    const {data, isLoading} = useGetTopCustomersData(page);

    async function handleFilter() {
        setStartDate(currentStartDate)
        setEndDate(currentEndDate);
    }

    function EnableButtonSearch() {
        return startDate === currentStartDate && endDate === currentEndDate;
    }
    return(
        <>
            <HeaderSection title="Melhores clientes" description="Consulte aqui os melhores clientes de sua loja!!"/>
            <div className="flex gap-5 items-center flex-wrap">

                <DatePickerWithRange/>

                <Button disabled={EnableButtonSearch()} onClick={() => handleFilter()}>Pesquisar</Button>
            </div>
            <div className="mt-5">
                <DataTable data={data?.customers || []} loading={isLoading} meta={data?.meta} columns={columnsCustomer}/>
            </div>

        </>
    )
}