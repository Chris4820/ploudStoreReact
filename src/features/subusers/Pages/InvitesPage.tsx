import HeaderSection from "../../../components/commons/Header";
import { FiUser, FiBriefcase, FiCalendar, FiMail, FiTrash } from "react-icons/fi";
import { Button } from "../../../components/ui/button";
import DeleteModal from "../../../components/modal/deleteModal";
import { useParams } from "react-router-dom";
import { useGetInvite } from "../api/store/store";
import LoadingComponent from "../../../containers/LoadingComponent";
import NotFoundComponent from "../../../containers/404Component";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useDeleteInvite } from "../mutation/DeleteInviteMutation";

export default function InvitesPage() {

  const { id } = useParams();
  const {data: invite, isLoading} = useGetInvite(id as string);

  const {mutate: deleteInvite, isPending} = useDeleteInvite(id as string);

   function formatDateComponent(date: string): string {
    return format(parseISO(date), 'dd/MM/yyyy HH:mm', { locale: ptBR });
  }

  if(isLoading){
    return <LoadingComponent/>
  }

  if(!invite) {
    return <NotFoundComponent title="Convite não encontrado" description="O convite que você está procurando não foi encontrado."/>
  }
  

  return (
    <>
      <HeaderSection 
        title="Detalhes do Convite"
        description="Visualize e gerencie os detalhes do convite enviado para um novo sub-usuário"
      />

      <div className="max-w-4xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Detalhes do Convite</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FiBriefcase className="mr-3 text-primary" />
                  <span>{invite.role.name}</span>
                </li>
                <li className="flex items-center">
                  <FiCalendar className="mr-3 text-primary" />
                  <span>Criado em: {formatDateComponent(invite.createdAt)}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Detalhes do Usuário</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FiUser className="mr-3 text-primary" />
                  <span>{invite.user.name}</span>
                </li>
                <li className="flex items-center">
                  <FiMail className="mr-3 text-primary" />
                  <span>{invite.user.email}</span>
                </li>
                <li className="flex items-center">
                  <FiCalendar className="mr-3 text-primary" />
                  <span>Entrou em: {formatDateComponent(invite.user.createdAt)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8" />

        <div className="flex justify-end items-center">
          
            <DeleteModal title="Eliminar Convite" 
              description="Tem certeza que deseja eliminar este convite?" 
              onConfirm={() => deleteInvite()}
            >
              <Button disabled={isPending} variant="destructive" className="flex items-center">
                <FiTrash className="mr-2"/>Eliminar Convite
            </Button>
            </DeleteModal>
        </div>
      </div>
    </>
  )
}