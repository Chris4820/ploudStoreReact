import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { deleteInvite } from '../api/req/subuser';

export const useDeleteInvite = (id: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteInvite(id),
    onSuccess: () => {
      // Mensagem de sucesso e redirecionamento
      toast.success("Convite deletado com sucesso!");
      navigate(`../subuser`); // Redireciona para a página de widgets
    },
  });
};
