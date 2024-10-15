import { zodResolver } from "@hookform/resolvers/zod";
import type { SubUserFormData } from "../Schema/SubUserSchema";
import SubUserSchema from "../Schema/SubUserSchema";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import LoadingComponent from "../../../containers/LoadingComponent";
import { Link } from "react-router-dom";
import { useGetRoles } from "../../roles/api/store";




type SubUserFormProps = {
  initialData?: SubUserFormData,
  onSubmit: (data: SubUserFormData) => void,
  isPending: boolean,
}


export default function SubUserForm({isPending, onSubmit, initialData} : SubUserFormProps) {

  const {data: roles, isLoading} = useGetRoles();

  const { handleSubmit, register, formState: { errors, isDirty }, setValue, getValues } = useForm<SubUserFormData>({
    resolver: zodResolver(SubUserSchema),
    defaultValues: initialData || {
      email: '',
      role: undefined,
    },
    mode: 'onSubmit',
  });

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div>
          <label>Email</label>
          <Input {...register("email")} className="max-w-96" placeholder="example@gmail.com"/>
          {errors.email && <span className='text-destructive text-[12px]'>{errors.email?.message}</span>}
        </div>
        <div>
          <label htmlFor="position" className="block font-medium mb-1">Cargo</label>
          <Select {...register("role")}
          defaultValue={getValues("role") ? getValues("role").toString() : undefined}
          onValueChange={(val) => setValue("role", parseInt(val,10), {shouldDirty: true})}>
            <SelectTrigger className="max-w-96 w-full">
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              {isLoading ? (
                  <LoadingComponent/>
              ) : (
                <>
                {roles && roles.length > 0 ? (
                  roles?.map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      {role.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="min-h-16 p-5 flex flex-col items-center justify-center">
                    <span>Nenhum cargo encontrado</span>
                    <Link to="/roles" className="text-blue-500">Clique aqui para criar um cargo</Link>
                  </div>
                  
                )}
                </>
              )} 
            </SelectContent>
          </Select>
          {errors.role && <span className='text-destructive text-[12px]'>{errors.role?.message}</span>}
        </div>

        <div className="mt-5">
        <SubmitButton type="submit" isLoading={isPending} enable={!isDirty} text="Atualizar"/>
        </div>
    </form>
  )
}