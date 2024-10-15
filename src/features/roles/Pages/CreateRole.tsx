import { zodResolver } from "@hookform/resolvers/zod";
import HeaderSection from "../../../components/commons/Header";
import SubHeaderSection from "../../../components/commons/subHeader";
import RoleSchema, { type RoleFormData } from "../Schema/RoleSchema";
import { useForm } from "react-hook-form";
import { permissionsData } from "../constants/PermissionData";
import CheckBoxPermissionComponent from "../components/CheckBoxPermission";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";
import { Input } from "../../../components/ui/input";
import { useCreateRole } from "../mutation/CreateRoleMutation";

export default function CreateRolePage() {
  const { handleSubmit, register, control } = useForm<RoleFormData>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });


  const { mutate: createRoleMutation } = useCreateRole();

  const onSubmit = (data: RoleFormData) => {
    createRoleMutation(data);
  };



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

      <form
      className="bg-muted/50 p-5 rounded-lg space-y-5"
      onSubmit={handleSubmit(onSubmit)}
      >
        <div>
            <label htmlFor="name">Nome</label>
            <Input {...register("name")}/>
          </div>
          <div>
            <label htmlFor="description">Descrição</label>
            <Input {...register("description")}/>
          </div>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {permissionsData.map((section) => (
          <div key={section.category}>
            <h1 className="text-lg font-bold">{section.category}</h1>
            <ul className="space-y-2">
              {section.permissions.map(({ label, value }) => (
                <CheckBoxPermissionComponent
                  key={value}
                  label={label}
                  value={value}
                  control={control}
                />
              ))}
            </ul>
          </div>
        ))}
        </section>
        <div className="mt-5 flex justify-end">
          <SubmitButton text="Criar" isLoading={false} enable={false}/>
        </div>
      </form>
    </div>
  );
}