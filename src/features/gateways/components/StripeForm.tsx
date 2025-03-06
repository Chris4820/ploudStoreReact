import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";
import { Switch } from "../../../components/ui/switch";
import type { StripeFormData } from "../schema/StripeSchema";
import StripeSchema from "../schema/StripeSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";



type StripeFormProps = {
  initialData?: StripeFormData;
  onSubmit: (data: StripeFormData) => void;
  isLoading: boolean,
};





export default function StripeForm({ onSubmit, initialData, isLoading } : StripeFormProps) {

  const { handleSubmit, register, formState: { errors, isDirty }, setValue, getValues } = useForm<StripeFormData>({
    resolver: zodResolver(StripeSchema),
    defaultValues: initialData || {
      config: {
        secretKey: "",
      },
      active: false,
      taxType: 'NONE',
      taxValue: 0,
    },
    mode: 'onSubmit',
});


  return(
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-5 gap-5" autoComplete="off">
      <div className="col-span-3 space-y-5">
        <div>
          <span>Client Token</span>
          <div className="relative">
          <Input
             key={2} 
             id="secretKey"
             type="text"
             {...register("config.secretKey")}
             autoComplete="off"/>
          </div>
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
              <p>Ative ou desative o paypal se sua loja</p>
          </div>
          <Switch {...register("active")} 
          className="accent-primary"
          defaultChecked={getValues("active")}
          onCheckedChange={(checked) => setValue("active", checked, {shouldDirty: true})}
          />
        </div>
      </div>
      <SubmitButton text="Atualizar" isLoading={isLoading} enable={!isDirty}/>
      </form>
  )
}