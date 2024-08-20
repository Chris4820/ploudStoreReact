import { useSearchParams } from "react-router-dom";
import HeaderSection from "../../../components/commons/Header";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { CreateCategoryFormData } from "../schema/CreateCategorySchema";
import createCategorySchema from "../schema/CreateCategorySchema";
import { useCreateCategory } from "../mutation/createCategoryMutation";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useGetStoreInformation } from "../../../api/store/store";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";
import { Switch } from "../../../components/ui/switch";



export default function CreateCategoryPage() {

    const [searchParams] = useSearchParams();

    

    const { data: store } = useGetStoreInformation();


    const { handleSubmit, register, formState: { errors }, setValue } = useForm<CreateCategoryFormData>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            parentId: parseInt(searchParams.get("parent") as string) || null,
            visible: true, // Valor padrão inicial
        }
    });

    const { mutate: createCategory, isPending } = useCreateCategory();

    function onSubmitCreateCategoryForm(data: CreateCategoryFormData) {
        createCategory(data);
    }

    return(
        <>
        <HeaderSection title="Criar categoria" description="Crie uma nova categoria"/>
            <form className="grid grid-cols-1 lg:grid-cols-5 gap-5" onSubmit={handleSubmit(onSubmitCreateCategoryForm)}>
            <div className="col-span-3 space-y-5">
                <div>
                    <label>Nome</label>
                    <Input {...register("name")} className="mt-1" />
                    {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Descrição</label>
                    <Textarea {...register("description")} className="mt-1 h-32 resize-none" />
                    {errors.description && <span className='text-destructive text-[12px]'>{errors.description.message}</span>}
                </div>
                <div>
                    <label>Slug</label>
                    <div className="flex mt-1">
                        <div className="h-10 border px-5 bg-muted rounded-l-md flex items-center">
                            <h1>{store?.subdomain}</h1>
                        </div>
                        <Input
                            {...register("slug")}
                            className="rounded-l-none"
                            placeholder="URL bonito para esta categoria (apenas letras, números e travessões)" />
                    </div>
                    {errors.slug && <span className='text-destructive text-[12px]'>{errors.slug.message}</span>}
                </div>
            </div>
            <div className="col-span-2 space-y-5">
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-lg">Visibilidade</h1>
                        <p>Altere a visibilidade da categoria</p>
                    </div>
                    <Switch
                        defaultChecked={true}
                        onCheckedChange={(checked) => setValue("visible", checked)} // Atualiza o valor de 'visible'
                        className="accent-primary"
                    />
                </div>
                <div className="mt-5 flex justify-end">
                <SubmitButton text="Criar categoria" isLoading={isPending} enable={true}/>
                </div>
            </div>
        </form>
        </>
    )
}