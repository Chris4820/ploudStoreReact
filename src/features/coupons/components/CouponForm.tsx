import React, { useEffect } from 'react';
import createCouponSchema, { CreateCouponFormData } from '../schema/CouponsSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/ui/input';
import { FiRefreshCcw } from 'react-icons/fi';
import { nanoid } from 'nanoid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { DatePickerDemo } from '../../../components/ui/datapicker';
import { Switch } from '../../../components/ui/switch';
import { Checkbox } from '../../../components/ui/checkbox';
import SubHeaderSection from '../../../components/commons/subHeader';
import { useGetProductsWithCategory } from '../../../api/store/store/categorie';
import SubmitButton from '../../../components/commons/buttons/SubmitButtonComponent';
import { toast } from 'sonner';

type CouponFormProps = {
  initialData?: CreateCouponFormData;
  onSubmit: (data: CreateCouponFormData) => void;
  mode: 'create' | 'edit';
};

export default function CouponForm({ initialData, onSubmit, mode }: CouponFormProps) {
  const { handleSubmit, register, formState: { errors, isValid }, getValues, setValue, watch } = useForm<CreateCouponFormData>({
    resolver: zodResolver(createCouponSchema),
    defaultValues: {
      limit: initialData?.limit || 0,
      isUsableInAllStores: initialData?.isUsableInAllStores ?? true,
      productIds: initialData?.productIds || [],
      type: initialData?.type || 'percentage',
      start_at: initialData?.start_at || null,
      expire_at: initialData?.expire_at || null,
      code: initialData?.code || "", // empty by default for creation
      minValue: initialData?.minValue || 0,
      value: initialData?.value || 0,
    },
    mode: 'onChange',
  });

  // Atualiza valores no modo de edição
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key as keyof CreateCouponFormData, initialData[key as keyof CreateCouponFormData]);
      });
    }
  }, [mode, initialData, setValue]);

  const { data: products = [] } = useGetProductsWithCategory();

  const isUsableInAllStores = watch("isUsableInAllStores");
  const selectedProducts = watch("productIds");

  function handleGenerateDiscount() {
    const randomCoupon = nanoid(12);
    setValue("code", randomCoupon);
  }

  function handleProductSelection(productId: number, isChecked: boolean) {
    const currentSelectedProducts = selectedProducts ?? [];
    const updatedSelectedProducts = isChecked 
      ? [...currentSelectedProducts, productId]
      : currentSelectedProducts.filter(p => p !== productId);
    
    setValue("productIds", updatedSelectedProducts, { shouldValidate: true });
  }

  // Verifica se houve alterações
  function hasChanges(): boolean {
    return Object.keys(initialData || {}).some(key => {
      const currentValue = getValues(key as keyof CreateCouponFormData);
      return currentValue !== initialData?.[key as keyof CreateCouponFormData];
    });
  }

  // Log para depuração
  useEffect(() => {
    console.log("Alterações detectadas:", hasChanges());
  }, [getValues, initialData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border rounded-lg p-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
            defaultValue="percentage"
            onValueChange={(value: "percentage" | "value") => setValue("type", value)}
          >
            <SelectTrigger className="min-w-[180px] w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentagem (%)</SelectItem>
              <SelectItem value="value">Quantia (Fixo)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="discountAmount" className="block font-medium mb-1">
            Desconto <span className="text-muted-foreground text-sm">{watch("type") === "percentage" ? "(em percentagem)" : "(em valor)"}</span>
          </label>
          <Input
            type="number"
            placeholder={`Exemplo ${watch("type") === "percentage" ? "15" : "15,99"}`}
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
            defaultChecked={initialData?.isUsableInAllStores ?? true}
            onCheckedChange={(checked) => setValue("isUsableInAllStores", checked)}
            className="accent-primary"
          />
        </div>
      </div>

      {!isUsableInAllStores && (
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
                        checked={selectedProducts?.includes(item.id) ?? false}
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

      <div className="flex justify-end w-full mt-5">
        <button type="submit" disabled={!isValid || !hasChanges()} className="mt-5">
          Criar
        </button>
      </div>
    </form>
  );
}
