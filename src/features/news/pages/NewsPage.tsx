import { useNavigate, useSearchParams } from "react-router-dom";
import CreateButtonComponent from "../../../components/commons/buttons/CreateButtonComponent";
import HeaderSection from "../../../components/commons/Header";
import { DataTable } from "../../../components/ui/datatable";
import { useGetBlogs, useGetTotalBlogs } from "../api/store";
import { NewsColumn } from "./NewsColumns";




export default function NewsPage() {

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const {data: blogs, isLoading} = useGetBlogs(page);
  const {data: totalBlogs, isLoading: totalBlogsLoading} = useGetTotalBlogs();

  console.log(JSON.stringify(totalBlogs));
  
  const navigate = useNavigate();
  return (
    <>
    <div className="flex justify-between items-center">
      <HeaderSection
        title="Notícias"
        description="Veja as notícias de sua loja"/>
      <CreateButtonComponent
        title="Notícia"
        onClick={() => navigate('create')}/>
    </div>

    <div className="mt-5">
      <DataTable data={blogs || []} loading={isLoading} columns={NewsColumn} meta={totalBlogs} metaLoading={totalBlogsLoading} link="edit/{id}"/>
    </div>
    </>
  )
}