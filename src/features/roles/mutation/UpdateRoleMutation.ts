



import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import queryClient from "../../../lib/reactquery/reactquery";
import type { RoleFormData } from "../Schema/RoleSchema";
import { updateRole, type RolesProps } from "../api/req";


export const useUpdateRole = (roleId: string) => {
  const navigate = useNavigate();


  return useMutation({
    mutationFn: (data: RoleFormData) => updateRole(roleId, data),
    onSuccess: async (_, variables) => {
      const roleDataCache = queryClient.getQueryData<RolesProps[]>(['roles']);
      if(roleDataCache) {
        queryClient.setQueryData(['roles'], (oldRoles: RolesProps[] | undefined) => 
          oldRoles?.map(role => 
            role.id === Number(roleId)
              ? {
                  ...role,
                  name: variables.name ?? role.name,
                  description: variables.description ?? role.description,
                }
              : role
          ) ?? []
        );
      }
      
      //Invalida a produto editada do cache
      queryClient.invalidateQueries({ queryKey: ['role', roleId] });
      toast.success('Produto editado com sucesso!');
      return navigate(`/dashboard/subuser/roles`)
    }
  }
  )
}