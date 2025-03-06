import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";
import { Switch } from "../../../components/ui/switch";
import type { MollieFormData } from "../schema/MollieSchema";
import MollieSchema from "../schema/MollieSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";



type MollieFormProps = {
  initialData?: MollieFormData;
  onSubmit: (data: MollieFormData) => void;
  isLoading: boolean,
};


export default function MollieForm({ onSubmit, isLoading, initialData } : MollieFormProps) {

  const { handleSubmit, register, formState: { errors, isDirty }, getValues, setValue } = useForm<MollieFormData>({
    resolver: zodResolver(MollieSchema),
    defaultValues: initialData || {
      config: {
        key: "",
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
          <span>Key</span>
          <Input className="mt-1" autoComplete="off" autoCorrect="off" autoSave="off" autoCapitalize="off"  {...register("config.key")} type="text"/>
          {errors.config?.key && <span className='text-destructive text-[12px]'>{errors.config.key.message}</span>}
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
              <p>Ative ou desative o paypal se sua loja</p>
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