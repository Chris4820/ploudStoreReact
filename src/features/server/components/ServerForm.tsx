import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";
import { Input } from "../../../components/ui/input";
import type { ServerFormData } from "../Schema/ServerSchema";
import ServerSchema from "../Schema/ServerSchema";
import { useForm } from "react-hook-form";
import { useEffect } from "react";



type ServerFormProps = {
  initialData?: ServerFormData,
  isPending: boolean,
  onSubmit: (data: ServerFormData) => void,
}

export default function ServerForm({ initialData, isPending, onSubmit} : ServerFormProps) {

  const { handleSubmit, register, reset, formState: { errors, isDirty}, getValues } = useForm<ServerFormData>({
    resolver: zodResolver(ServerSchema),
    defaultValues: initialData || {
      name: '',
    }
});

useEffect(() => {
  reset(initialData)
}, [initialData, reset])

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="col-span-3 space-y-5">
        <div className="border rounded-lg p-5">
          <h4>Nome</h4>
          <Input {...register("name")} className="mt-2" placeholder="Insira o nome do servidor" defaultValue={getValues("name")}/>
          {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <SubmitButton isLoading={isPending} enable={!isDirty} text="Atualizar"/>
      </div>
    </form>
  )
}