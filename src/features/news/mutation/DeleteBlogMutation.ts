




import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import queryClient from "../../../lib/reactquery/reactquery";
import { deleteBlog } from "../api/req";


export const useDeleteBlog = (id: string | undefined) => {

  const navigate = useNavigate();


  return useMutation({
    mutationFn: () => deleteBlog(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['blogs']});
      queryClient.invalidateQueries({queryKey: ['blog', id]}); // Invalida todas as queries de cupons
      toast.success('Blog eliminado com sucesso!');
      return navigate(`/dashboard/engagement/news`)
    }
  }
  )
}