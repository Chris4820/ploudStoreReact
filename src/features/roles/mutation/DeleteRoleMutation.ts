import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import queryClient from "../../../lib/reactquery/reactquery";
import { deleteRole, type RolesProps } from "../api/req";

export const useDeleteRole = (roleId: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteRole(roleId),
    onSuccess: async () => {

      const existingProductsInCache = queryClient.getQueryData<RolesProps[]>(['roles']);

      if(existingProductsInCache) {
        // Remove o produto eliminado do cache
        queryClient.setQueryData(['roles'], (oldRoles: RolesProps[] | undefined) => {
          
        return oldRoles?.filter(roles => roles.id !== Number(roleId));
        });
      }
      // Remove o cache do produto eliminado
      queryClient.removeQueries({ queryKey: ['role', roleId]});

      toast.success('Cargo eliminado com sucesso!');
      return navigate(`/dashboard/subuser/roles`)
    }
  });
};
