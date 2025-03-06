import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";
import { Switch } from "../../../components/ui/switch";
import type { PagSeguroFormData } from "../schema/PagSeguroSchema";
import PagSeguroSchema from "../schema/PagSeguroSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";



type PagSeguroFormProps = {
  initialData?: PagSeguroFormData;
  onSubmit: (data: PagSeguroFormData) => void;
  isLoading: boolean,
};


export default function PagSeguroForm({ onSubmit, isLoading, initialData } : PagSeguroFormProps) {

  const { handleSubmit, register, formState: { errors, isDirty }, getValues, setValue } = useForm<PagSeguroFormData>({
    resolver: zodResolver(PagSeguroSchema),
    defaultValues: initialData || {
      config: {
        secretKey: ''
      },
      active: false,
      taxType: 'NONE',
      taxValue: 0,
    },
    mode: 'onSubmit',
});

console.log(errors);


  return(
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-5 gap-5" autoComplete="off">
      <div className="col-span-3 space-y-5">
        <div>
          <span>Email</span>
          <Input className="mt-1" autoComplete="off" autoCorrect="off" autoSave="off" autoCapitalize="off"  {...register("config.email")} type="text"/>
          {errors.config?.email && <span className='text-destructive text-[12px]'>{errors.config.email.message}</span>}
        </div>
        <div>
          <span>Key</span>
          <Input className="mt-1" autoComplete="off" autoCorrect="off" autoSave="off" autoCapitalize="off"  {...register("config.secretKey")} type="text"/>
          {errors.config?.secretKey && <span className='text-destructive text-[12px]'>{errors.config.secretKey.message}</span>}
        </div>
        <div className="flex items-center gap-5">
          <div>
            <span>Tipo de taxa</span>
            <Select
              {...register("taxType")}
              defaultValue={getValues("taxType") ? getValues("taxType").toString() : undefined}
              onValueChange={(val : 'PERCENTAGE' | 'VALUE' | 'NONE') => setValue("taxType", val, {shouldDirty: true})}
              >
                <SelectTrigger className="w-[240px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="none" value={"NONE"}>Nenhum</SelectItem>
                  <SelectItem key="none" value={"PERCENTAGE"}>Percentagem</SelectItem>
                  <SelectItem key="none" value={"VALUE"}>Valor</SelectItem>
                </SelectContent>
              </Select>
            </div>
              <div>
                <span>Valor da Taxa</span>
                <Input className="mt-1" autoComplete="off"  {...register("taxValue", { valueAsNumber: true })} type="number"/>
                {errors.taxValue && <span className='text-destructive text-[12px]'>{errors.taxValue.message}</span>}
              </div>
          </div>
        </div>
    <div className="col-span-2 space-y-5">
      <div className="p-5 border rounded-lg flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-lg">Visibilidade</h1>
              <p>Ative ou desative o PagSeguro se sua loja</p>
          </div>
          <Switch 
            {...register("active")}
            defaultChecked={getValues("active")}
            onCheckedChange={(checked) => setValue("active", checked, {shouldDirty: true})} // Atualiza o valor de 'visible' className="accent-primary"
          />
        </div>
        <div className="flex justify-end">
          <SubmitButton text="Atualizar" isLoading={isLoading} enable={!isDirty}/>
        </div>
      </div>
      </form>
  )
}