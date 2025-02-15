import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import queryClient from "../../../lib/reactquery/reactquery";
import type { BlogFormData } from "../schema/newsSchema";
import { createBlog } from "../api/req";


export const useCreateBlog = () => {
  const navigate = useNavigate();


  return useMutation({
    mutationFn: (data: BlogFormData) => createBlog(data),
    onSuccess: async () => {
      //Atualizar cache

      queryClient.removeQueries({ queryKey: ['blogs']});
      queryClient.removeQueries({ queryKey: ['totalBlogs']});

      toast.success('Blog criado com sucesso!');
      return navigate(`/dashboard/engagement/news`)
    }
  }
  )
}