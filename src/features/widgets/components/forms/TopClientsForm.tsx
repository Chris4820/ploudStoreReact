import { zodResolver } from "@hookform/resolvers/zod";
import { DatePickerDemo } from "../../../../components/ui/datapicker";
import { Input } from "../../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../../components/commons/buttons/SubmitButton";
import { Switch } from "../../../../components/ui/switch";
import type { TopClientsWidgetFormData } from "../../schema/TopClientsSchema";
import TopClientsWidgetSchema from "../../schema/TopClientsSchema";
import SubHeaderSection from "../../../../components/commons/subHeader";


type TopClientsFormProps = {
  initialData?: TopClientsWidgetFormData,
  onSubmit: (data: TopClientsWidgetFormData) => void,
  isPending: boolean,
}


export default function TopClientsForm({isPending, onSubmit, initialData} : TopClientsFormProps) {

  const { handleSubmit, register, formState: { errors, isDirty }, setValue, getValues } = useForm<TopClientsWidgetFormData>({
    resolver: zodResolver(TopClientsWidgetSchema),
    defaultValues: initialData || {
      header: '',
      description: '',
      visible: false,
      startAt: undefined,
      position: 'right',
      expireAt: null,
      config: {
        clientsCount: 3,
        period: 'daily',
        showValue: false,
      }
    },
    mode: 'onSubmit',
  });

  return(
    <form onSubmit={handleSubmit(onSubmit)}>

      <section>
        <SubHeaderSection title="Gerais" description="Mude o aspeto que é apresentado na loja!"/>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          <div>
            <label htmlFor="header" className="block font-medium mb-1">Cabeçalho</label>
            <Input {...register("header")}/>
            {errors.header && <span className='text-destructive text-[12px]'>{errors.header?.message}</span>}
          </div>

          <div>
          <label htmlFor="position" className="block font-medium mb-1">Posição</label>
          <Select 
            defaultValue={getValues("position")} 
            {...register("position")}
            onValueChange={(value : 'left' | 'right') => setValue("position", value, {shouldDirty: true}) }
          >
            <SelectTrigger className="min-w-[180px] w-full">
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="right">Direito</SelectItem>
              <SelectItem value="left">Esquerdo</SelectItem>
            </SelectContent>
          </Select>
          {errors.position && <span className='text-destructive text-[12px]'>{errors.position.message}</span>}
        </div>

        <div className="p-3 border rounded-lg flex justify-between items-center lg:mt-5">
          <div>
            <p className="font-semibold text-base">Ativar Widget</p>
          </div>
          <Switch
            defaultChecked={getValues("visible")}
            onCheckedChange={(checked) => setValue("visible", checked, { shouldDirty: true })} // Atualiza o valor de 'visible'
            className="accent-primary"
          />
        </div>

        <div>
          <label htmlFor="barType" className="block font-medium mb-1">Descrição <span className="text-[12px] text-muted-foreground">(opcional)</span></label>
          <Textarea {...register("description")}/>
          {errors.description && <span className='text-destructive text-[12px]'>{errors.description.message}</span>}
        </div>

        <div>
          <label htmlFor="startDate" className="block font-medium mb-1">Data de início</label>
          <DatePickerDemo 
            {...register("startAt")} 
            initialDate={getValues("startAt") || null}
            onChange={(date) => setValue("startAt", date || undefined, { shouldDirty: true,})}
          />
          {errors.startAt && <span className='text-destructive text-[12px]'>{errors.startAt.message}</span>}
        </div>
        <div>
          <label htmlFor="barType" className="block font-medium mb-1">Data de térmio</label>
          <DatePickerDemo
          initialDate={getValues("expireAt")}
          {...register("expireAt")} 
          onChange={(date) => setValue("expireAt", date, { shouldDirty: true,})}
          />
          {errors.expireAt && <span className='text-destructive text-[12px]'>{errors.expireAt.message}</span>}
        </div>

        </div>
      </section>

      <section className="mt-5">

      <SubHeaderSection title="Pódio de clientes" description="Mude as opções da sua widget"/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-end">

      <div>
          <label htmlFor="clientCound" className="block font-medium mb-1">Quantidade de clientes no top</label>
          <Select
          {...register("config.clientsCount")}
          defaultValue={getValues("config.clientsCount") ? getValues("config.clientsCount").toString() : undefined}
          onValueChange={(val) => setValue("config.clientsCount", parseInt(val,10), {shouldDirty: true})}
          >
            <SelectTrigger className="min-w-[180px] w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={3} value={"3"}>3</SelectItem>
              <SelectItem key={4} value={"4"}>4</SelectItem>
              <SelectItem key={5} value={"5"}>5</SelectItem>
            </SelectContent>
          </Select>
          {errors.config?.clientsCount && <span className='text-destructive text-[12px]'>{errors.config.clientsCount.message}</span>}
        </div>

        <div>
          <label htmlFor="clientCound" className="block font-medium mb-1">Período do top</label>
          <Select
          {...register("config.period")}
          defaultValue={getValues("config.period")}
          onValueChange={(val : 'daily' | 'weekly'| 'monthly' | 'yearly') => setValue("config.period", val, {shouldDirty: true})}
          >
            <SelectTrigger className="min-w-[180px] w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={3} value={'daily'}>Diário</SelectItem>
              <SelectItem key={4} value={'weekly'}>Semanal</SelectItem>
              <SelectItem key={5} value={"monthly"}>Mensal</SelectItem>
              <SelectItem key={6} value={"yearly"}>Anual</SelectItem>
            </SelectContent>
          </Select>
          {errors.config?.clientsCount && <span className='text-destructive text-[12px]'>{errors.config.clientsCount.message}</span>}
        </div>

        <div className="p-3 border rounded-lg flex justify-between items-center">
          <div>
            <p className="font-semibold text-base">Mostrar valor gasto</p>
          </div>
          <Switch
            defaultChecked={getValues("visible")}
            onCheckedChange={(checked) => setValue("visible", checked, { shouldDirty: true })} // Atualiza o valor de 'visible'
            className="accent-primary"
          />
        </div>

        </div>

      </section>
        <div className="flex justify-end mt-5">
            <SubmitButton type="submit" isLoading={isPending} enable={!isDirty} text="Atualizar"/>
        </div>
      </form>
        
  )
}