

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import queryClient from "../../../lib/reactquery/reactquery";
import type { VariableFormData } from "../schema/VariablesSchema";
import { useNavigate } from "react-router-dom";
import { createVariable, type VariablesProps } from "../api/req/variablesAPI";


export const useCreateVariable = () => {

  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: VariableFormData) => createVariable(data),
    onSuccess: async (data, variables) => {
      //Atualizar cache

      console.log(data);
        const newVariable: VariablesProps = {
          id: data.variable.id, // ID do novo cupom
          createdAt: "25/05/2002",
          slug: variables.slug, // Data de expiração

        };
        queryClient.setQueryData(['variables'], (oldData: VariablesProps[]) => {
          return oldData ? [newVariable, ...oldData] : [newVariable];
        });
      toast.success('Variavel criada com sucesso');
      return navigate(`../variable`);
    }
  }
  )
}