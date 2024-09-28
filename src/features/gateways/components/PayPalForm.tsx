import { zodResolver } from "@hookform/resolvers/zod";
import type { PaypalFormData } from "../schema/PayPalSchema";
import PaypalSchema from "../schema/PayPalSchema";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";
import { Switch } from "../../../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";



type PayPalFormProps = {
  initialData?: PaypalFormData;
  onSubmit: (data: PaypalFormData) => void;
  isLoading: boolean,
};


export default function PayPalForm({ onSubmit, isLoading, initialData } : PayPalFormProps) {

  const { handleSubmit, register, formState: { errors, isDirty }, getValues, setValue } = useForm<PaypalFormData>({
    resolver: zodResolver(PaypalSchema),
    defaultValues: initialData || {
      config: {
        email: "",
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
          <span>Email</span>
          <Input className="mt-1" autoComplete="off" autoCorrect="off" autoSave="off" autoCapitalize="off"  {...register("config.email")} type="text"/>
          {errors.config?.email && <span className='text-destructive text-[12px]'>{errors.config.email.message}</span>}
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