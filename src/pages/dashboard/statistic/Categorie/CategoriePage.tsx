import { useState } from "react";
import { useGetCategoryData } from "../../../../api/store/store/statistic";
import HeaderSection from "../../../../components/commons/Header";
import { Button } from "../../../../components/ui/button";
import { DatePickerWithRange } from "../../../../components/ui/datepicker";
import { useSearchParams } from "react-router-dom";
import BestCategorieTable from "../../../../components/tables/bestCategorie/bestCategorieTable";




export default function CategoriesPage() {

    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const [startDate, setStartDate] = useState();
    const [currentStartDate, setCurrentStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [currentEndDate, setCurrentEndDate] = useState();

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
            <HeaderSection title="Categorias mais usadas" description="Consulte aqui as categorias mais populares de sua loja!!"/>
            <div className="flex gap-5 items-center flex-wrap">

                <DatePickerWithRange/>

                <Button disabled={EnableButtonSearch()} onClick={() => handleFilter()}>Pesquisar</Button>
            </div>
            <div className="mt-5">
                <BestCategorieTable categories={data?.categories || []} isLoading={isLoading} meta={data?.meta}/>
            </div>

        </>
    )
}