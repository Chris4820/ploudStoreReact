import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import queryClient from '../../../lib/reactquery/reactquery';
import { toast } from 'sonner';
import { updateVariable, type VariablesProps } from '../api/req/variablesAPI';
import type { VariableFormData } from '../schema/VariablesSchema';

export const useUpdateVariable = (VariableId: number) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: VariableFormData) => updateVariable(VariableId, data),
    onSuccess: (_, variables) => {
      // Atualiza o cache do widget individualmente
      queryClient.setQueryData(['variable', VariableId], variables); // Atualiza o cache para o widgetType específico

      
      queryClient.setQueryData(['variables'], (oldData: VariablesProps[] | undefined) => {
        if(!oldData) {
          return queryClient.removeQueries({queryKey: ['variables']}); // Invalida todas as queries de cupons
          //Se nao tiver cache, é atualizado tudo
          //return queryClient.invalidateQueries({ queryKey: ['products', variables.categoryId]});
        }
        return oldData.map((variable: VariablesProps) =>
          variable.id === VariableId 
            ? {
                ...variable,
                slug: variables.slug,
              }
            : variable
        );
      });

      // Mensagem de sucesso e redirecionamento
      toast.success("Variavel atualizado com sucesso!");
      navigate("../variable"); // Redireciona para a página de widgets
    },
  });
};
