import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { acceptInviteStore } from "../../../api/req/store";
import { useNavigate } from "react-router-dom";
import queryClient from "../../../lib/reactquery/reactquery";

export const useAcceptInviteStore = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (storeId: number) => acceptInviteStore(storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inviteStores'] });
      queryClient.invalidateQueries({ queryKey: ['subStores'] });
      toast('Convite aceito com sucesso!');
      return navigate('/');
    }
  }
  )
}