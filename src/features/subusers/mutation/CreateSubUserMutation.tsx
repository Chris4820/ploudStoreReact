import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { SubUserFormData } from '../Schema/SubUserSchema';
import { createSubUser } from '../api/req/subuser';

export const useCreateSubUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SubUserFormData) => createSubUser(data),
    onSuccess: () => {

      // Mensagem de sucesso e redirecionamento
      toast.success("SubUser criado com sucesso!");
      navigate("../"); // Redireciona para a página de widgets
    },
  });
};
