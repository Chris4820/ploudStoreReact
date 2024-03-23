import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { StoreProps, acceptInviteStore, createNewStore, getInviteStores, getStores, getSubStores, getUserInformation } from "../req/user";



const queryClient = new QueryClient();

export function useGetUserInformation() {
    return useQuery({
      queryKey: ['userInfo'],
      queryFn: getUserInformation,
      staleTime: 1000*100*2, //2 minute
    })
}

  
export function useGetStores() {
  return useQuery({
      queryKey: ['stores'],
      queryFn: getStores,
      staleTime: 1000*100*2, //2 minute
    })
}

export function useCreateStore() {
  return useMutation<StoreProps>(createNewStore, {
    onSuccess: () => {
      // invalidate the query cache for 'books'
      queryClient.invalidateQueries({queryKey: ['stores']});
    },
    onError: (error : any) => {
      console.log(error);
    },
  });
}

export function useGetSubStores() {
  return useQuery({
      queryKey: ['subStores'],
      queryFn: getSubStores,
      staleTime: 1000*100*2, //2 minute
    })
}

export function useAcceptInviteStore() {
  const mutation = useMutation({
    mutationFn: acceptInviteStore,
    onSuccess: (data) => {
      return data;
    }
  });

  const acceptInvite = async (storeId: number) => {
    await mutation.mutateAsync(storeId);
  };

  return acceptInvite;
}

export function useGetInviteStores() {
  return useQuery({
      queryKey: ['inviteStores'],
      queryFn: getInviteStores,
      staleTime: 1000*100*2, //2 minute
    })
}