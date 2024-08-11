import { DataTable } from "../../ui/datatable"
import Pagination from "../../ui/pagination";
import {  columns } from "./columns"
import { CategoryData, MetaProps } from "../../../api/req/store/statistic";
import { useSearchParams } from "react-router-dom";




type BestCategoriesTable = {
  meta?: MetaProps,
  categories: CategoryData[],
  isLoading: boolean,
}

export default function BestCategorieTable({meta, categories, isLoading} : BestCategoriesTable) {
    
  
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  return (
    <>
        <DataTable columns={columns} data={categories} loading={isLoading}/>
        {meta && (
        <Pagination items={meta.items} pages={meta.pages} page={page} />
      )}
    </>
  )
}
