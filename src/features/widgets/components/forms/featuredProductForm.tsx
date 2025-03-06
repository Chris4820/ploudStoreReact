import { zodResolver } from "@hookform/resolvers/zod";
import { useGetProducts } from "../../../products/api/store/product"
import { Input } from "../../../../components/ui/input";
import FeaturedProductWidgetSchema, { type FeaturedProductWidgetFormData } from "../../schema/FeaturedProductSchema";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import LoadingComponent from "../../../../containers/LoadingComponent";
import SubmitButton from "../../../../components/commons/buttons/SubmitButton";
import { Switch } from "../../../../components/ui/switch";
import { DatePickerDemo } from "../../../../components/ui/datapicker";
import { Textarea } from "../../../../components/ui/textarea";
import SubHeaderSection from "../../../../components/commons/subHeader";



type FeaturedProductWidgetFormProps = {
  initialData?: FeaturedProductWidgetFormData,
  onSubmit: (data: FeaturedProductWidgetFormData) => void,
  isPending: boolean,
}



export default function FeaturedProductForm({initialData, onSubmit, isPending} : FeaturedProductWidgetFormProps) {
  const { data: products, isLoading } = useGetProducts(undefined);


  const { handleSubmit, register, formState: { errors, isDirty }, setValue, getValues } = useForm<FeaturedProductWidgetFormData>({
    resolver: zodResolver(FeaturedProductWidgetSchema),
    defaultValues: initialData || {
      header: '',
      description: '',
      visible: false,
      startAt: undefined,
      expireAt: null,
      position: 'right',
      config: {
        product: undefined,
      }
    },
    mode: 'onSubmit',
  });

  return(
      <form
      onSubmit={handleSubmit(onSubmit)}>

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
      <SubHeaderSection title="Produto em destaque" description="Mude as opções da sua widget"/>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-end">
          <div>
            <label htmlFor="discountType" className="block font-medium mb-1">Produto</label>
            <Select
            {...register("config.product")}
            defaultValue={getValues("config.product") ? getValues("config.product").toString() : undefined}
            onValueChange={(val) => setValue("config.product", parseInt(val,10), {shouldDirty: true})}
            >
              <SelectTrigger className="min-w-[180px] w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {isLoading ? (
                    <LoadingComponent/>
                ) : (
                  <>
                  {products?.map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name}
                    </SelectItem>
                  ))}
                  </>
                )} 
              </SelectContent>
            </Select>
            {errors.config?.product && <span className='text-destructive text-[12px]'>{errors.config.product.message}</span>}
          </div>
        </div>
      </section>
        <div className="flex justify-end mt-5">
          <SubmitButton isLoading={isPending} enable={!isDirty} text="Atualizar"/>
      </div>
      </form>
  )
}