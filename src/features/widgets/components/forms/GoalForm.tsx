import { zodResolver } from "@hookform/resolvers/zod";
import { useGetActiveGoals } from "../../../../api/store/store/goal";
import { DatePickerDemo } from "../../../../components/ui/datapicker";
import { Input } from "../../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import LoadingComponent from "../../../../containers/LoadingComponent";
import type { GoalWidgetFormData } from "../../schema/GoalSchema";
import GoalWidgetSchema from "../../schema/GoalSchema";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../../components/commons/buttons/SubmitButton";
import { Switch } from "../../../../components/ui/switch";
import SubHeaderSection from "../../../../components/commons/subHeader";



type GoalWidgetFormProps = {
  initialData?: GoalWidgetFormData,
  onSubmit: (data: GoalWidgetFormData) => void,
  isPending: boolean,
}


export default function GoalWidgetForm({isPending, onSubmit, initialData} : GoalWidgetFormProps) {

  const { data: goals, isLoading } = useGetActiveGoals();

  const { handleSubmit, register, formState: { errors, isDirty }, setValue, getValues } = useForm<GoalWidgetFormData>({
    resolver: zodResolver(GoalWidgetSchema),
    defaultValues: initialData || {
      header: '',
      description: '',
      visible: false,
      startAt: undefined,
      expireAt: null,
      position: 'right',
      config: {
        goal: undefined,
        barType: 'FULL',
        progressDisplayType: 'VALUE',
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
          <Textarea className="shadow-md" {...register("description")}/>
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
        <SubHeaderSection title="Meta" description="Mude as opções da sua widget meta"/>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div>
          <label htmlFor="discountType" className="block font-medium mb-1">Meta</label>
          <Select
          {...register("config.goal")}
          defaultValue={getValues("config.goal") ? getValues("config.goal").toString() : undefined}
          onValueChange={(val) => setValue("config.goal", parseInt(val,10), {shouldDirty: true})}
          >
            <SelectTrigger className="min-w-[180px] w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {isLoading ? (
                  <LoadingComponent/>
              ) : (
                <>
                {goals?.map((goal) => (
                  <SelectItem key={goal.id} value={goal.id.toString()}>
                    {goal.title}
                  </SelectItem>
                ))}
                </>
              )} 
            </SelectContent>
          </Select>
          {errors.config?.goal && <span className='text-destructive text-[12px]'>{errors.config.goal.message}</span>}
        </div>

        <div>
          <label htmlFor="barType" className="block font-medium mb-1">Tipo de barra</label>
          <Select 
            defaultValue={getValues("config.barType")} 
            {...register("config.barType")}
            onValueChange={(value : 'FULL' | 'DASHED') => setValue("config.barType", value, {shouldDirty: true}) }
          >
            <SelectTrigger className="min-w-[180px] w-full">
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FULL">Full</SelectItem>
              <SelectItem value="DASHED">Dashed</SelectItem>
            </SelectContent>
          </Select>
          {errors.config?.barType && <span className='text-destructive text-[12px]'>{errors.config.barType.message}</span>}
        </div>

        <div>
          <label htmlFor="ValueType" className="block font-medium mb-1">Tipo</label>
          <Select 
            defaultValue={getValues("config.progressDisplayType")} 
            {...register("config.progressDisplayType")}
            onValueChange={(value: "PERCENTAGE" | "VALUE" | "BOTH") => setValue("config.progressDisplayType", value, {shouldDirty: true}) }
          >
            <SelectTrigger className="min-w-[180px] w-full">
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PERCENTAGE" className="py-2 px-4 text-gray-700 hover:bg-gray-100">
                Percentagem - Progresso: <span className="font-semibold">75%</span>
              </SelectItem>
              <SelectItem value="VALUE" className="py-2 px-4 text-gray-700 hover:bg-gray-100">
                Valor - <span className="font-semibold">€50</span> de <span className="font-semibold">€100</span>
              </SelectItem>
              <SelectItem value="BOTH" className="py-2 px-4 text-gray-700 hover:bg-gray-100">
                Ambos - Progresso: <span className="font-semibold">75%</span> | Valor: <span className="font-semibold">€50</span> de <span className="font-semibold">€100</span>
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.config?.progressDisplayType && <span className='text-destructive text-[12px]'>{errors.config?.progressDisplayType.message}</span>}
        </div>
        </div>
      </section>
        <div className="flex justify-end mt-5">
            <SubmitButton type="submit" isLoading={isPending} enable={!isDirty} text="Atualizar"/>
        </div>
      </form>
        
  )
}