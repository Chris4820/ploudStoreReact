import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InviteStoreProps, acceptInviteStore } from "../../api/req/user";
import { Button } from "../../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { toast } from "sonner";

export function DialogDemo({ children, inviteStore }: { children: React.ReactNode, inviteStore: InviteStoreProps }) {
    const queryClient = useQueryClient();

    const { mutate: acceptInvite } = useMutation({
        mutationFn: acceptInviteStore,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inviteStores'] });
            queryClient.invalidateQueries({ queryKey: ['subStores'] });
            toast('Convite aceito com sucesso!');
        }
    });

    async function deleteInvite(storeId: number) {
        try {
            
        } catch (error) {
            
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Aceitar Convite</DialogTitle>
                    <span className="text-muted-foreground text-sm">{inviteStore.created_at}</span>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <p>Você foi convidado para se tornar membro:</p>
                        <ul className="mt-2">
                            <li>Loja: <b>{inviteStore.store.name}</b></li>
                            <li>Cargo: <b>{inviteStore.role}</b></li>
                        </ul>
                        <p className="mt-5">Pretende aceitar o convite?</p>
                </div>
                    <DialogFooter>
                        <div className="flex items-center justify-end">
                            <div className="flex gap-4">
                                <Button variant="destructive">Eliminar</Button>
                                <Button onClick={() => acceptInvite(inviteStore.store.storeId)}>Aceitar</Button>
                            </div>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
