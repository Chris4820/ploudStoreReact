



import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import queryClient from "../../../lib/reactquery/reactquery";
import { editCustomPage, type CustomPageProps, } from "../api/req";
import type { CustomPageFormData } from "../schema/customPages";


export const useUpdateCustomPage = (customPageID: string) => {
  const navigate = useNavigate();


  return useMutation({
    mutationFn: (data: CustomPageFormData) => editCustomPage(customPageID, data),
    onSuccess: async (_, variables) => {
      const roleDataCache = queryClient.getQueryData<CustomPageProps[]>(['page']);
  
      if (roleDataCache) {
        queryClient.setQueryData(['page'], (oldCustomPage?: CustomPageProps[]) => 
          oldCustomPage
            ? oldCustomPage.map((page) => 
                page.id === Number(customPageID) 
                  ? { ...page, 
                    title: variables.title,
                    slug: variables.slug,
                    isActive: variables.isActive,
                   }  // Atualiza apenas a página correta
                  : page
              )
            : []
        );
      }
  
      // Invalida apenas a página editada
      queryClient.invalidateQueries({ queryKey: ['page', customPageID] });
  
      toast.success('Página editada com sucesso!');
      navigate(`/dashboard/page`);
    }
  });
}