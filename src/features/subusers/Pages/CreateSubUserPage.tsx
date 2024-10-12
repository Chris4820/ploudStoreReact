import HeaderSection from "../../../components/commons/Header";
import SubUserForm from "../components/SubUserForm";
import { useCreateSubUser } from "../mutation/CreateSubUserMutation";

export default function CreateSubUserPage() {

  const { mutate: createSubUser, isPending} = useCreateSubUser();
  return (
    <>
      <HeaderSection
        title="Adicionar membro"
        description="Adicione um novo membro"
        backLink="../"
      />
      <SubUserForm isPending={isPending} onSubmit={createSubUser}/>
    </>
  );
}