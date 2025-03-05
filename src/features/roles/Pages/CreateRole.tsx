import HeaderSection from "../../../components/commons/Header";
import SubHeaderSection from "../../../components/commons/subHeader";
import { useCreateRole } from "../mutation/CreateRoleMutation";
import RoleFormComponent from "../components/RoleForm";

export default function CreateRolePage() {


  const { mutate: createRoleMutation, isPending } = useCreateRole();


  return (
    <div>
      <HeaderSection
        title="Criar Cargo"
        description="Crie um novo cargo para seus sub-usuários"
        backLink="../"
      />

      <SubHeaderSection
        title="Permissões"
        description="Selecione as permissões para o cargo"
      />

      <RoleFormComponent
        onSubmit={createRoleMutation}
        isSubmit={isPending}/>
    </div>
  );
}