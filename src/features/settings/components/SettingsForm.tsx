import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { t } from "i18next";
import { Switch } from "../../../components/ui/switch";
import { Textarea } from "../../../components/ui/textarea";
import { IoIosHelpCircle } from "react-icons/io";
import settingsSchema, { type SettingsFormData } from "../schema/SettingsSchema";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";
import { useEffect } from "react";
import SubHeaderSection from "../../../components/commons/subHeader";


type SettingsFormProps = {
    initialData: SettingsFormData,
    onSubmit: (data: SettingsFormData) => void,
    isLoading: boolean,
  }


export default function SettingsForm({ initialData, onSubmit, isLoading }: SettingsFormProps) {

    const { handleSubmit, register, formState: { errors, isDirty }, setValue, getValues, reset} = useForm<SettingsFormData>({
        resolver: zodResolver(settingsSchema),
        defaultValues: initialData,
        mode: 'onSubmit',
    })

    console.log("Render");

    useEffect(() => {
        reset(initialData)
      }, [initialData, reset])

    return(
                <form onSubmit={handleSubmit(onSubmit)}>
                    <SubHeaderSection title="Loja" description="Configure os detalhes gerais de sua loja"/>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                        <div>
                            <div>
                                <label htmlFor="storeName" className="block font-medium mb-1">Nome da loja</label>
                                <Input {...register('name')} />
                                {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                            </div>
                            <div>
                    <div className='mt-5'>
                                    <p className="mb-1">{t("setup.currency")}:</p>
                                    <Select defaultValue={getValues("StoreSettings.currency")} {...register('StoreSettings.currency')} onValueChange={(value) => setValue('StoreSettings.currency', value,{shouldDirty: true})}>
                                        <SelectTrigger className="min-w-[180px]">
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px] overflow-y-auto">
                                            <SelectItem value="eur">
                                                <div className="flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#112f95"></rect><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path fill="#f6cd46" d="M16 8.167L15.745 8.951 14.921 8.951 15.588 9.435 15.333 10.219 16 9.735 16.667 10.219 16.412 9.435 17.079 8.951 16.255 8.951 16 8.167z"></path><path fill="#f6cd46" d="M16.255 22.565L16 21.781 15.745 22.565 14.921 22.565 15.588 23.049 15.333 23.833 16 23.349 16.667 23.833 16.412 23.049 17.079 22.565 16.255 22.565z"></path><path fill="#f6cd46" d="M9.193 16.542L9.86 17.026 9.605 16.242 10.272 15.758 9.448 15.758 9.193 14.974 8.938 15.758 8.114 15.758 8.781 16.242 8.526 17.026 9.193 16.542z"></path><path fill="#f6cd46" d="M12.596 9.079L12.342 9.863 11.517 9.863 12.184 10.347 11.93 11.131 12.596 10.647 13.263 11.131 13.009 10.347 13.675 9.863 12.851 9.863 12.596 9.079z"></path><path fill="#f6cd46" d="M10.105 11.57L9.85 12.354 9.026 12.354 9.693 12.839 9.438 13.623 10.105 13.138 10.772 13.623 10.517 12.839 11.184 12.354 10.36 12.354 10.105 11.57z"></path><path fill="#f6cd46" d="M10.36 19.161L10.105 18.377 9.85 19.161 9.026 19.161 9.693 19.646 9.438 20.43 10.105 19.945 10.772 20.43 10.517 19.646 11.184 19.161 10.36 19.161z"></path><path fill="#f6cd46" d="M12.851 21.653L12.596 20.869 12.342 21.653 11.517 21.653 12.184 22.137 11.93 22.921 12.596 22.437 13.263 22.921 13.009 22.137 13.675 21.653 12.851 21.653z"></path><path fill="#f6cd46" d="M23.886 15.758L23.062 15.758 22.807 14.974 22.552 15.758 21.728 15.758 22.395 16.242 22.14 17.026 22.807 16.542 23.474 17.026 23.219 16.242 23.886 15.758z"></path><path fill="#f6cd46" d="M19.404 9.079L19.149 9.863 18.325 9.863 18.991 10.347 18.737 11.131 19.404 10.647 20.07 11.131 19.816 10.347 20.483 9.863 19.658 9.863 19.404 9.079z"></path><path fill="#f6cd46" d="M21.483 12.839L21.228 13.623 21.895 13.138 22.562 13.623 22.307 12.839 22.974 12.354 22.15 12.354 21.895 11.57 21.64 12.354 20.816 12.354 21.483 12.839z"></path><path fill="#f6cd46" d="M22.15 19.161L21.895 18.377 21.64 19.161 20.816 19.161 21.483 19.646 21.228 20.43 21.895 19.945 22.562 20.43 22.307 19.646 22.974 19.161 22.15 19.161z"></path><path fill="#f6cd46" d="M19.658 21.653L19.404 20.869 19.149 21.653 18.325 21.653 18.991 22.137 18.737 22.921 19.404 22.437 20.07 22.921 19.816 22.137 20.483 21.653 19.658 21.653z"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>
                                                    <div className="inline-block w-0.5 self-stretch bg-muted-foreground"/>
                                                    Euro <span className="text-muted-foreground">(EUR)</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="usd">
                                                <div className="flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#fff"></rect><path d="M1.638,5.846H30.362c-.711-1.108-1.947-1.846-3.362-1.846H5c-1.414,0-2.65,.738-3.362,1.846Z" fill="#a62842"></path><path d="M2.03,7.692c-.008,.103-.03,.202-.03,.308v1.539H31v-1.539c0-.105-.022-.204-.03-.308H2.03Z" fill="#a62842"></path><path fill="#a62842" d="M2 11.385H31V13.231H2z"></path><path fill="#a62842" d="M2 15.077H31V16.923000000000002H2z"></path><path fill="#a62842" d="M1 18.769H31V20.615H1z"></path><path d="M1,24c0,.105,.023,.204,.031,.308H30.969c.008-.103,.031-.202,.031-.308v-1.539H1v1.539Z" fill="#a62842"></path><path d="M30.362,26.154H1.638c.711,1.108,1.947,1.846,3.362,1.846H27c1.414,0,2.65-.738,3.362-1.846Z" fill="#a62842"></path><path d="M5,4h11v12.923H1V8c0-2.208,1.792-4,4-4Z" fill="#102d5e"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path><path fill="#fff" d="M4.601 7.463L5.193 7.033 4.462 7.033 4.236 6.338 4.01 7.033 3.279 7.033 3.87 7.463 3.644 8.158 4.236 7.729 4.827 8.158 4.601 7.463z"></path><path fill="#fff" d="M7.58 7.463L8.172 7.033 7.441 7.033 7.215 6.338 6.989 7.033 6.258 7.033 6.849 7.463 6.623 8.158 7.215 7.729 7.806 8.158 7.58 7.463z"></path><path fill="#fff" d="M10.56 7.463L11.151 7.033 10.42 7.033 10.194 6.338 9.968 7.033 9.237 7.033 9.828 7.463 9.603 8.158 10.194 7.729 10.785 8.158 10.56 7.463z"></path><path fill="#fff" d="M6.066 9.283L6.658 8.854 5.927 8.854 5.701 8.158 5.475 8.854 4.744 8.854 5.335 9.283 5.109 9.979 5.701 9.549 6.292 9.979 6.066 9.283z"></path><path fill="#fff" d="M9.046 9.283L9.637 8.854 8.906 8.854 8.68 8.158 8.454 8.854 7.723 8.854 8.314 9.283 8.089 9.979 8.68 9.549 9.271 9.979 9.046 9.283z"></path><path fill="#fff" d="M12.025 9.283L12.616 8.854 11.885 8.854 11.659 8.158 11.433 8.854 10.702 8.854 11.294 9.283 11.068 9.979 11.659 9.549 12.251 9.979 12.025 9.283z"></path><path fill="#fff" d="M6.066 12.924L6.658 12.494 5.927 12.494 5.701 11.799 5.475 12.494 4.744 12.494 5.335 12.924 5.109 13.619 5.701 13.19 6.292 13.619 6.066 12.924z"></path><path fill="#fff" d="M9.046 12.924L9.637 12.494 8.906 12.494 8.68 11.799 8.454 12.494 7.723 12.494 8.314 12.924 8.089 13.619 8.68 13.19 9.271 13.619 9.046 12.924z"></path><path fill="#fff" d="M12.025 12.924L12.616 12.494 11.885 12.494 11.659 11.799 11.433 12.494 10.702 12.494 11.294 12.924 11.068 13.619 11.659 13.19 12.251 13.619 12.025 12.924z"></path><path fill="#fff" d="M13.539 7.463L14.13 7.033 13.399 7.033 13.173 6.338 12.947 7.033 12.216 7.033 12.808 7.463 12.582 8.158 13.173 7.729 13.765 8.158 13.539 7.463z"></path><path fill="#fff" d="M4.601 11.104L5.193 10.674 4.462 10.674 4.236 9.979 4.01 10.674 3.279 10.674 3.87 11.104 3.644 11.799 4.236 11.369 4.827 11.799 4.601 11.104z"></path><path fill="#fff" d="M7.58 11.104L8.172 10.674 7.441 10.674 7.215 9.979 6.989 10.674 6.258 10.674 6.849 11.104 6.623 11.799 7.215 11.369 7.806 11.799 7.58 11.104z"></path><path fill="#fff" d="M10.56 11.104L11.151 10.674 10.42 10.674 10.194 9.979 9.968 10.674 9.237 10.674 9.828 11.104 9.603 11.799 10.194 11.369 10.785 11.799 10.56 11.104z"></path><path fill="#fff" d="M13.539 11.104L14.13 10.674 13.399 10.674 13.173 9.979 12.947 10.674 12.216 10.674 12.808 11.104 12.582 11.799 13.173 11.369 13.765 11.799 13.539 11.104z"></path><path fill="#fff" d="M4.601 14.744L5.193 14.315 4.462 14.315 4.236 13.619 4.01 14.315 3.279 14.315 3.87 14.744 3.644 15.44 4.236 15.01 4.827 15.44 4.601 14.744z"></path><path fill="#fff" d="M7.58 14.744L8.172 14.315 7.441 14.315 7.215 13.619 6.989 14.315 6.258 14.315 6.849 14.744 6.623 15.44 7.215 15.01 7.806 15.44 7.58 14.744z"></path><path fill="#fff" d="M10.56 14.744L11.151 14.315 10.42 14.315 10.194 13.619 9.968 14.315 9.237 14.315 9.828 14.744 9.603 15.44 10.194 15.01 10.785 15.44 10.56 14.744z"></path><path fill="#fff" d="M13.539 14.744L14.13 14.315 13.399 14.315 13.173 13.619 12.947 14.315 12.216 14.315 12.808 14.744 12.582 15.44 13.173 15.01 13.765 15.44 13.539 14.744z"></path></svg>
                                                    <div className="inline-block w-0.5 self-stretch bg-muted-foreground"/>
                                                    Dollar <span className="text-muted-foreground">(USD)</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="brl">
                                                <div className="flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#459a45"></rect><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M3.472,16l12.528,8,12.528-8-12.528-8L3.472,16Z" fill="#fedf00"></path><circle cx="16" cy="16" r="5" fill="#0a2172"></circle><path d="M14,14.5c-.997,0-1.958,.149-2.873,.409-.078,.35-.126,.71-.127,1.083,.944-.315,1.951-.493,2.999-.493,2.524,0,4.816,.996,6.519,2.608,.152-.326,.276-.666,.356-1.026-1.844-1.604-4.245-2.583-6.875-2.583Z" fill="#fff"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>
                                                    <div className="inline-block w-0.5 self-stretch bg-muted-foreground"/>
                                                    Real <span className="text-muted-foreground">(BRL)</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="gbp">
                                                <div className="flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#071b65"></rect><path d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z" fill="#fff"></path><path d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z" fill="#b92932"></path><path d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z" fill="#b92932"></path><path d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z" fill="#fff"></path><rect x="13" y="4" width="6" height="24" fill="#fff"></rect><rect x="1" y="13" width="30" height="6" fill="#fff"></rect><rect x="14" y="4" width="4" height="24" fill="#b92932"></rect><rect x="14" y="1" width="4" height="30" transform="translate(32) rotate(90)" fill="#b92932"></rect><path d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z" fill="#b92932"></path><path d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z" fill="#b92932"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>
                                                    <div className="inline-block w-0.5 self-stretch bg-muted-foreground"/>
                                                    Libra <span className="text-muted-foreground">(GBP)</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="cad">
                                                <div className="flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#fff" d="M8 4H24V28H8z"></path><path d="M5,4h4V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" fill="#c53a28"></path><path d="M27,4h4V28h-4c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" transform="rotate(180 27 16)" fill="#c53a28"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M16.275,22.167l-.138-2.641c-.007-.16,.117-.296,.277-.304,.021,0,.042,0,.063,.004l2.629,.462-.355-.979c-.03-.08-.005-.17,.061-.223l2.88-2.332-.649-.303c-.091-.043-.135-.146-.104-.242l.569-1.751-1.659,.352c-.093,.019-.186-.029-.223-.116l-.321-.756-1.295,1.389c-.076,.08-.201,.083-.281,.007-.049-.047-.071-.115-.058-.182l.624-3.22-1.001,.578c-.095,.056-.217,.024-.272-.071-.002-.004-.004-.008-.006-.012l-1.016-1.995-1.016,1.995c-.049,.098-.169,.138-.267,.089-.004-.002-.008-.004-.012-.006l-1.001-.578,.624,3.22c.021,.108-.05,.212-.158,.233-.067,.013-.135-.009-.182-.058l-1.295-1.389-.321,.756c-.037,.087-.131,.136-.223,.116l-1.659-.352,.569,1.751c.031,.095-.013,.199-.104,.242l-.649,.303,2.88,2.332c.066,.054,.091,.144,.061,.223l-.355,.979,2.629-.462c.158-.027,.309,.079,.336,.237,.004,.021,.005,.042,.004,.063l-.138,2.641h.551Z" fill="#c53a28"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>
                                                    <div className="inline-block w-0.5 self-stretch bg-muted-foreground"/>
                                                    Dólar canadense <span className="text-muted-foreground">(CAD)</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="sek">
                                                <div className="flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#fff" d="M8 4H24V28H8z"></path><path d="M5,4h4V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" fill="#c53a28"></path><path d="M27,4h4V28h-4c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" transform="rotate(180 27 16)" fill="#c53a28"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M16.275,22.167l-.138-2.641c-.007-.16,.117-.296,.277-.304,.021,0,.042,0,.063,.004l2.629,.462-.355-.979c-.03-.08-.005-.17,.061-.223l2.88-2.332-.649-.303c-.091-.043-.135-.146-.104-.242l.569-1.751-1.659,.352c-.093,.019-.186-.029-.223-.116l-.321-.756-1.295,1.389c-.076,.08-.201,.083-.281,.007-.049-.047-.071-.115-.058-.182l.624-3.22-1.001,.578c-.095,.056-.217,.024-.272-.071-.002-.004-.004-.008-.006-.012l-1.016-1.995-1.016,1.995c-.049,.098-.169,.138-.267,.089-.004-.002-.008-.004-.012-.006l-1.001-.578,.624,3.22c.021,.108-.05,.212-.158,.233-.067,.013-.135-.009-.182-.058l-1.295-1.389-.321,.756c-.037,.087-.131,.136-.223,.116l-1.659-.352,.569,1.751c.031,.095-.013,.199-.104,.242l-.649,.303,2.88,2.332c.066,.054,.091,.144,.061,.223l-.355,.979,2.629-.462c.158-.027,.309,.079,.336,.237,.004,.021,.005,.042,.004,.063l-.138,2.641h.551Z" fill="#c53a28"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>
                                                    <div className="inline-block w-0.5 self-stretch bg-muted-foreground"/>
                                                    Coroa sueca <span className="text-muted-foreground">(SEK)</span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                        </Select>
                                </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 mt-5'>
                        <div className='border rounded-md h-auto flex justify-between items-center p-5 sm:min-w-[400px]'>
                            <div>
                                <h1 className='font-semibold text-base'>Modo manutenção</h1>
                                <p className='text-sm text-muted-foreground'>Sua loja irá entrar em manutenção</p>
                            </div>
                            <Switch defaultChecked={getValues("StoreSettings.maintenance")} {...register('StoreSettings.maintenance')} onCheckedChange={(value) => setValue("StoreSettings.maintenance", value, {shouldDirty: true})}/>
                        </div>
                    </div>
                    </div>
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="description" className="block font-medium mb-1">Descrição</label>
                                <Textarea className="resize-none" {...register('description')} maxLength={60}/>
                                {errors.description && <span className='text-destructive text-[12px]'>{errors.description.message}</span>}
                            </div>
                            <div>
                                <div className="flex gap-2 items-center mb-1">
                                <label htmlFor="keywords" className="block font-medium">KeyWords</label>
                                <a href="https://www.atinternet.com/en/glossary/keyword-2/" rel="noopener noreferrer" target="_blank">
                                    <IoIosHelpCircle className="cursor-pointer h-5 w-5"/>
                                </a>
                                </div>
                                <Textarea className="resize-none" {...register('keywords')} maxLength={90}/>
                                {errors.keywords && <span className='text-destructive text-[12px]'>{errors.keywords.message}</span>}
                            </div>
                        </div>
                    </div>

                    <SubHeaderSection title="Checkout" description="Configure os detalhes do checkout"/>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="MinBasket" className="block font-medium mb-1">Valor mínimo do carrinho</label>
                                <Input {...register('StoreSettings.minBasket', { valueAsNumber: true })} type="number" />
                                {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-end mt-5">
                        <SubmitButton isLoading={isLoading} text="Guardar alterações" enable={!isDirty} />;
                    </div>
                </form>
    );
}