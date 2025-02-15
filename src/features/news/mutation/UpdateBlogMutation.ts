




import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import queryClient from "../../../lib/reactquery/reactquery";
import type { BlogFormData } from "../schema/newsSchema";
import { updateBlog } from "../api/req";


export const useUpdateBlog = (id: string | undefined) => {

  const navigate = useNavigate();


  return useMutation({
    mutationFn: (data: BlogFormData) => updateBlog(id, data),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['blogs']});
      queryClient.invalidateQueries({queryKey: ['blog', id]}); // Invalida todas as queries de cupons
      toast.success('Blog atualizado com sucesso!');
      return navigate(`/dashboard/engagement/news`)
    }
  }
  )
}