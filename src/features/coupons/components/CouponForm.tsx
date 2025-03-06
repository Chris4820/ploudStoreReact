import { useForm } from 'react-hook-form';
import { Input } from '../../../components/ui/input';
import { FiRefreshCcw } from 'react-icons/fi';
import { nanoid } from 'nanoid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { DatePickerDemo } from '../../../components/ui/datapicker';
import { Switch } from '../../../components/ui/switch';
import { Checkbox } from '../../../components/ui/checkbox';
import SubHeaderSection from '../../../components/commons/subHeader';
import { useGetProductsWithCategory } from '../../categories/api/store/categorie';
import SubmitButton from '../../../components/commons/buttons/SubmitButton';
import { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import CouponSchema, { CouponFormData } from '../schema/CouponsSchema';

type CouponFormProps = {
  initialData?: CouponFormData;
  onSubmit: (data: CouponFormData) => void;
  mode: 'create' | 'edit';
  isLoading: boolean,
  children?: React.ReactNode
};

export default function CouponForm({ initialData, onSubmit, mode, isLoading, children }: CouponFormProps) {

  const [isFormChanged, setIsFormChanged] = useState(false);

  const { handleSubmit, register, formState: { errors }, getValues, setValue, watch } = useForm<CouponFormData>({
    resolver: zodResolver(CouponSchema),
    defaultValues: initialData || {
      id: undefined,
      limit: 0,
      isUsableInAllStores: true,
      productIds: [],
      type: 'PERCENTAGE',
      start_at: null,
      expire_at: null,
      code: "",
      minValue: 0,
      value: 0,
      enable: false,
    },
    mode: 'onSubmit',
  });

  const { data: products = [] } = useGetProductsWithCategory();

  // Função para gerar código de cupom usando useCallback
  const handleGenerateDiscount = useCallback(() => {
    const randomCoupon = nanoid(12);
    setValue("code", randomCoupon);
  }, [setValue]);

  const handleEnableProducts = useCallback((value: boolean) => {
    // Define o valor para "isUsableInAllStores" com base no valor passado
    setValue("isUsableInAllStores", value);
  
    // Se `value` for verdadeiro, limpa a seleção de produtos
    if (value) {
      setValue("productIds", []);
    }
  }, [setValue]);
  

  // Função para selecionar/desselecionar produtos usando useCallback
  const handleProductSelection = useCallback((productId: number, isChecked: boolean) => {
    const currentSelectedProducts = getValues("productIds") || [];
    const updatedSelectedProducts = isChecked 
      ? [...currentSelectedProducts, productId]
      : currentSelectedProducts.filter(p => p !== productId);

    setValue("productIds", updatedSelectedProducts, { shouldValidate: true });
  }, [getValues, setValue]);


  useEffect(() => {
    if (mode === 'edit') {
      const subscription = watch((values) => {
        const isChanged = JSON.stringify(initialData) !== JSON.stringify(values);
        setIsFormChanged(isChanged);
      });
  
      return () => subscription.unsubscribe();
    }
  }, [initialData, watch, mode]);


  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-5">
      <div className='border rounded-lg p-5 col-span-2'>
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5 ">
        <div>
          <label htmlFor="couponCode" className="block font-medium mb-1">
            Código do Cupom <span className="text-sm text-muted-foreground">(Único)</span>
          </label>
          <div className="flex items-center">
            <Input
              id="couponCode"
              {...register("code")}
              className="rounded-r-none"
            />
            <div className="h-10 flex items-center justify-center border bg-muted px-2 rounded-r-md">
              <FiRefreshCcw onClick={handleGenerateDiscount} className="cursor-pointer" />
            </div>
          </div>
          {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
        </div>

        <div>
          <label htmlFor="usageLimit" className="block font-medium mb-1">
            Limite de Usos <span className="text-sm text-muted-foreground">(0 para ilimitado)</span>
          </label>
          <Input defaultValue={0} id="usageLimit" type="number" {...register("limit", { valueAsNumber: true })} />
          {errors.limit && <p className="text-red-500 text-sm mt-1">{errors.limit.message}</p>}
        </div>

        <div>
          <label htmlFor="discountType" className="block font-medium mb-1">Tipo de Desconto</label>
          <Select
            defaultValue="PERCENTAGE"
            onValueChange={(value: "PERCENTAGE" | "VALUE") => setValue("type", value)}
          >
            <SelectTrigger className="min-w-[180px] w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PERCENTAGE">Percentagem (%)</SelectItem>
              <SelectItem value="VALUE">Quantia (Fixo)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="discountAmount" className="block font-medium mb-1">
            Valor de Desconto <span className="text-muted-foreground text-sm"></span>
          </label>
          <Input
            type="number"
            placeholder={`Exemplo 15`}
            {...register("value", { valueAsNumber: true })}
          />
          {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value.message}</p>}
        </div>

        <div>
          <label htmlFor="minValue" className="block font-medium mb-1">
            Valor Mínimo <span className="text-sm text-muted-foreground">(0 para ilimitado)</span>
          </label>
          <Input type="number" defaultValue={0} {...register("minValue", { valueAsNumber: true })} />
          {errors.minValue && <p className="text-red-500 text-sm mt-1">{errors.minValue.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Data de Início</label>
          <DatePickerDemo key={"startDate"} initialDate={getValues("start_at")} onChange={(date) => setValue("start_at", date)} />
        </div>

        <div>
          <label className="block font-medium mb-1">Data de Término (Opcional)</label>
          <DatePickerDemo key={"expire_at"} initialDate={getValues("expire_at")} onChange={(date) => setValue("expire_at", date)} />
        </div>

        <div>
          <label htmlFor="applyCoupon" className="block font-medium mb-1">Aplicar cupom em toda a loja:</label>
          <Switch
           {...register("isUsableInAllStores")}
            defaultChecked={initialData?.isUsableInAllStores ?? true}
            onCheckedChange={(checked) => handleEnableProducts(checked)}
            className="accent-primary"
          />
        </div>
      </div>
      {!watch("isUsableInAllStores") && (
        <div className="w-full p-5 border rounded-md h-auto mt-5">
          <SubHeaderSection title="Produtos" description="Selecione os produtos que o cupom tem efeito" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
            {products.map((product, categoryIndex) => (
              <div key={categoryIndex} className="border rounded-md p-3">
                <h1 className="text-xl font-semibold mb-2">{product.name}</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {product.products.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`product-${item.id}`}
                        checked={getValues("productIds")?.includes(item.id) ?? false}
                        value={item.id}
                        onCheckedChange={(checked) => handleProductSelection(item.id, checked === true)}
                      />
                      <label
                        htmlFor={`product-${item.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 break-words overflow-hidden"
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {errors.productIds && <p className="text-red-500 text-sm mt-1">{errors.productIds.message}</p>}
        </div>
      )}
      </div>

      <div className="space-y-5">
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-lg">Ativação do Cupom</h1>
                        <p>Ative o cupom para uso.</p>
                    </div>
                    <Switch
                        defaultChecked={getValues("enable")}
                        onCheckedChange={(checked) => setValue("enable", checked)} // Atualiza o valor de 'visible'
                        className="accent-primary"
                    />
                </div>
                
                {children && children}
                
                <div className="mt-5 flex justify-end">
                  <SubmitButton isLoading={isLoading} text="Guardar alterações" enable={mode === "edit" && !isFormChanged} />
            </div>
            </div>
    </form>
  );
}
