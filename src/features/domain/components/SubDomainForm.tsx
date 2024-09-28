import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import SubDomainSchema, { type SubDomainFormData } from "../Schema/SubDomainSchema";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";
import { t } from "i18next";
import { useEffect } from "react";




type SubDomainFormProps = {
  initialData?: SubDomainFormData,
  isPending: boolean,
  onSubmit: (data: SubDomainFormData) => void,
}


export default function SubDomainForm({ initialData, isPending, onSubmit} : SubDomainFormProps) {
  const { handleSubmit, register, reset, formState: { errors, isDirty}, getValues } = useForm<SubDomainFormData>({
    resolver: zodResolver(SubDomainSchema),
    defaultValues: initialData || {
      subdomain: '',
    }
});


  useEffect(() => {
    reset(initialData)
  }, [initialData, reset])


  return(
    <>
    <div className="border bg-card rounded-lg p-5 mt-5 h-auto space-y-5">
      <div>
        <h1 className="font-semibold text-base">{t("settingsPage.domainSection.configureSubDomain.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("settingsPage.domainSection.configureSubDomain.title")} <small className="sm:hidden text-[12px] text-muted-foreground"><span className="font-semibold text-green-600">(YourStoreName</span>.ploudstore.com)</small></p>
      </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex">
        <div className="hidden sm:flex h-10 items-center justify-center rounded-s-md border px-4 text-muted-foreground bg-muted">https://</div>
          <Input defaultValue={getValues("subdomain")} {...register('subdomain')} className="rounded-none"/>
          <div className="hidden sm:flex h-10 items-center justify-center rounded-e-md border px-4 text-muted-foreground bg-muted">.ploudstore.com</div>
      </div>
      {errors.subdomain && <span className='text-destructive text-[12px]'>{errors.subdomain.message}</span>}
      <div className="flex justify-end mt-5">
        <SubmitButton text={t("save")} isLoading={isPending} enable={!isDirty}/>
      </div>
    </form>
  </div>
  </>
  )
}