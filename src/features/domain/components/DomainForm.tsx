import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { CustomDomainFormData } from "../Schema/CustomDomainSchema";
import CustomDomainSchema from "../Schema/CustomDomainSchema";
import { Input } from "../../../components/ui/input";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";
import { useEffect } from "react";




type CustomDomainFormProps = {
  initialData?: CustomDomainFormData,
  isPending: boolean,
  onSubmit: (data: CustomDomainFormData) => void,
}

export default function CustomDomainForm({ initialData, isPending, onSubmit} : CustomDomainFormProps) {

  const { handleSubmit, register, reset, formState: { errors, isDirty}, getValues } = useForm<CustomDomainFormData>({
    resolver: zodResolver(CustomDomainSchema),
    defaultValues: initialData || {
      domain: '',
    }
});

  useEffect(() => {
    reset(initialData)
  }, [initialData, reset])

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span>Dominio</span>
          <Input 
            className="mt-1" 
            type="text" 
            autoComplete="off"
            {...register("domain")} 
            defaultValue={getValues("domain")}
          />
        </div>
        {errors.domain && <span className='text-destructive text-[12px]'>{errors.domain.message}</span>}
        <div className="mt-5 flex justify-end">
            <SubmitButton isLoading={isPending} text="Atualizar" enable={!isDirty}/>
        </div>
    </form>
  )
}