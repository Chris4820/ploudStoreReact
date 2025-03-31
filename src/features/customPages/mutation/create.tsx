import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import queryClient from "../../../lib/reactquery/reactquery";
import { createCustomPage, type CustomPageProps } from "../api/req";
import type { CustomPageFormData } from "../schema/customPages";

export const useCreateCustomPage = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CustomPageFormData) => createCustomPage(data),
    onSuccess: (data, variables) => {
      if(queryClient.getQueryData(['page'])) {
        const { page } = data;
        const newPage : CustomPageProps = {
          id: page.id, // ID da nova role
          title: variables.title, // Nome da role
          slug: variables.slug,
          menuName: variables.menuName,
          isActive: variables.isActive,
          createdAt: page.createdAt,
        };
        queryClient.setQueryData(['page'], (oldData: CustomPageProps[]) => {
          return oldData ? [...oldData, newPage] : [newPage];
        });
      }

      toast.success("Página criada com sucesso");
      navigate("../page");
    }
  }
  )
}