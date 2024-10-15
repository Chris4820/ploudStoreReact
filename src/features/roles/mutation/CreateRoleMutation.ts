


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { RoleFormData } from "../Schema/RoleSchema";
import { useNavigate } from "react-router-dom";
import { createRole, type RoleProps } from "../api/req";
import queryClient from "../../../lib/reactquery/reactquery";

export const useCreateRole = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RoleFormData) => createRole(data),
    onSuccess: (data, variables) => {
      const { role } = data;
      const newRole = {
        id: role.id, // ID da nova role
        name: variables.name, // Nome da role
        description: variables.description, // descrição da role
        createdAt: role.createdAt,
      };
      queryClient.setQueryData(['roles'], (oldData: RoleProps[]) => {
        return oldData ? [newRole, ...oldData] : [newRole];
      });

      toast.success("Cargo criado com sucesso");
      navigate("../roles");
    }
  }
  )
}