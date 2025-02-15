import HeaderSection from "../../../components/commons/Header";
import { useCreateBlog } from "../mutation/CreateBlogMutation";
import BlogForm from "../components/BlogForm";



export default function CreateNewPage() {
  const {mutate: createBlog, isPending} = useCreateBlog();

  return(
    <>
      <HeaderSection
        title="Criar Nova Noticia"
        description="Preencha os detalhes da sua nova notícia abaixo."
        backLink="/dashboard/engagement/news"/>

      <BlogForm
        buttonText="Criar"
        isSubmit={isPending}
        onSubmit={createBlog}/>
    </>
  )

}