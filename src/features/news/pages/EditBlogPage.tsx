import HeaderSection from "../../../components/commons/Header";
import BlogForm from "../components/BlogForm";
import { useParams } from "react-router-dom";
import { useGetBlog } from "../api/store";
import LoadingComponent from "../../../containers/LoadingComponent";
import NotFoundComponent from "../../../containers/404Component";
import { useUpdateBlog } from "../mutation/UpdateBlogMutation";
import DeleteModal from "../../../components/modal/deleteModal";
import { Button } from "../../../components/ui/button";
import { useDeleteBlog } from "../mutation/DeleteBlogMutation";



export default function EditNewPage() {
  const { id } = useParams<{ id: string }>(); // Pegar o id da URL

  const { data: blog, isLoading } = useGetBlog(id);

  const {mutate: updateBlog, isPending} = useUpdateBlog(id);
  const {mutate: deleteBlog, isPending: deletePending} = useDeleteBlog(id);

  if(isLoading) {
    return <LoadingComponent/>
  }

  if(!blog) {
    return <NotFoundComponent title="Blog não encontrado" description="Este blog não existe"/>
  }

  

  return(
    <>
      <HeaderSection
        title="Editar Noticia"
        description="Preencha os detalhes da sua nova notícia abaixo."
        backLink="/dashboard/engagement/news"/>

      <BlogForm
        initialData={blog}
        buttonText="Editar"
        isSubmit={isPending}
        onSubmit={updateBlog}
      >
        <div className="p-5 border rounded-lg flex justify-between items-center mt-5">
                <div>
                    <h1 className="font-semibold text-destructive text-lg">Eliminar Blog</h1>
                    <p className="text-muted-foreground">Elimine permanentemente o blog</p>
                    <p className="text-destructive text-sm mt-1">*Esta ação não tem volta</p>
                </div>
                <DeleteModal
                title="Eliminar blog" 
                description="Este blog será apagado permanentemente, tem a certeza?"
                important="Esta ação não tem volta"
                onConfirm={() => deleteBlog()}>
                    <Button type="button" disabled={deletePending} variant={"destructive"}>Eliminar</Button>
                </DeleteModal>
                  
            </div>
      </BlogForm>
    </>
  )

}