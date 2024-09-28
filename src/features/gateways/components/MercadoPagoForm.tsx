import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";
import { Switch } from "../../../components/ui/switch";
import type { MercadoPagoFormData } from "../schema/MercadoPagoSchema";
import MercadoPagoSchema from "../schema/MercadoPagoSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";



type MercadoPagoFormProps = {
  initialData?: MercadoPagoFormData;
  onSubmit: (data: MercadoPagoFormData) => void;
  isLoading: boolean,
};



export default function MercadoPagoForm({ onSubmit, initialData, isLoading } : MercadoPagoFormProps) {

  const { handleSubmit, register, formState: { errors, isDirty }, setValue, getValues } = useForm<MercadoPagoFormData>({
    resolver: zodResolver(MercadoPagoSchema),
    defaultValues: initialData || {
      id: undefined,
      config: {
        clientId: "",
        tokenId: "",
      },
      active: false,
      taxType: 'NONE',
      taxValue: 0,
    },
    mode: 'onSubmit',
});

  return(
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="grid grid-cols-1 lg:grid-cols-5 gap-5" 
      autoComplete="off"  // Desativa sugestões automáticas no formulário
      autoCorrect="off" 
      autoFocus={false}>

      <div className="col-span-3 space-y-5">
        <div>
          <span>ClientID</span>
          <Input 
            className="mt-1" 
            {...register("config.clientId")} 
            type="text"
          />
          {errors.config?.clientId && <span className='text-destructive text-[12px]'>{errors.config.clientId.message}</span>}
        </div>

        <div>
          <span>Client Token</span>
          <div className="relative">
            <Input
              key={2} 
              id="token_client"
              type="text"
              {...register("config.tokenId")}
            />
          </div>
          {errors.config?.tokenId && <span className='text-destructive text-[12px]'>{errors.config.tokenId.message}</span>}
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
            <p>Ative ou desative o MercadoPago na sua loja</p>
          </div>
          <Switch 
            className="accent-primary"
            defaultChecked={getValues("active")}
            onCheckedChange={(checked) => setValue("active", checked, { shouldDirty: true })}
          />
        </div>
      </div>

      <SubmitButton text="Atualizar" isLoading={isLoading} enable={!isDirty}/>
    </form>
  );
}
