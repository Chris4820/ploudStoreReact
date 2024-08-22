import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetCategoryData } from "../../../api/store/store/statistic";
import HeaderSection from "../../../components/commons/Header";
import { DatePickerWithRange } from "../../../components/ui/datepickerWithRange";
import { Button } from "../../../components/ui/button";
import { columnsCategories } from "./CategorieColumns";
import { DataTable } from "../../../components/ui/datatable";




export default function CategoriesPage() {

    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const [startDate, setStartDate] = useState();
    const [currentStartDate,] = useState();
    const [endDate, setEndDate] = useState();
    const [currentEndDate,] = useState();

    const {data, isLoading} = useGetCategoryData(page);

    async function handleFilter() {
        setStartDate(currentStartDate)
        setEndDate(currentEndDate);
    }

    function EnableButtonSearch() {
        return startDate === currentStartDate && endDate === currentEndDate;
    }
    return(
        <>
            <HeaderSection title="Categorias mais usadas" description="Consulte aqui as categorias mais populares de sua loja!!" backLink/>
            <div className="flex gap-5 items-center flex-wrap">

                <DatePickerWithRange/>

                <Button disabled={EnableButtonSearch()} onClick={() => handleFilter()}>Pesquisar</Button>
            </div>
            <div className="mt-5">
                <DataTable data={data?.categories || []} loading={isLoading} meta={data?.meta} columns={columnsCategories}/>
            </div>

        </>
    )
}