import HeaderSection from "../../../components/commons/Header";
import { useParams } from "react-router-dom";
import { useGetRole } from "../api/store";
import LoadingComponent from "../../../containers/LoadingComponent";
import RoleFormComponent from "../components/RoleForm";
import NotFoundComponent from "../../../containers/404Component";
import { useUpdateRole } from "../mutation/UpdateRoleMutation";
import DeleteModal from "../../../components/modal/deleteModal";
import { useDeleteRole } from "../mutation/DeleteRoleMutation";
import DeleteButton from "../../../components/commons/buttons/DeleteButton";

export default function UpdateRolePage() {

  const { id } = useParams<{ id: string }>();

  const {data: role , isLoading} = useGetRole(id as string);

  const { mutate: updateRole, isPending} = useUpdateRole(id as string);

  const { mutate: deleteRole, isPending: deletePending } = useDeleteRole(id as string);

  if(isLoading) {
      return <LoadingComponent/>
  }

  if(!role) {
    return <NotFoundComponent
              title="Não encontrado"
              description="Essa role nao foi encontrada"/>
  }


  return (
    <div>
      <HeaderSection
        title={`Editar cargo: ${role.name}`}
        description="Altere as permissões e detalhes deste cargo."
        backLink="../"
      />

      <RoleFormComponent 
      initialData={role}
      onSubmit={updateRole}
      buttonText="Atualizar"
      isSubmit={isPending}>
          <DeleteModal 
                title="Eliminar cargo" 
                description="Esta acção não é reversivel"
                important="Esta ação não tem volta"
                onConfirm={() => deleteRole()}>
                    <DeleteButton 
                      type="button" 
                      disabled={deletePending}
                      text="Eliminar"
                    />
                </DeleteModal>
      </RoleFormComponent>
    </div>
  );
}