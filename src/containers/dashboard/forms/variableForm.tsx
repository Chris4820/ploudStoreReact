import { z } from "zod";
import SubHeaderSection from "../../../components/commons/subHeader";
import { Input } from "../../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import CreateButtonComponent from "../../../components/commons/buttons/CreateButtonComponent";
import { MdDelete } from "react-icons/md";
import { Button } from "../../../components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVariable } from "../../../api/req/store/variable";
import { toast } from "sonner";


export default function VariableForm() {

    const queryClient = useQueryClient();

    const settingsSchema = z.object({
        name: z.string().min(3, "O nome precisa ter no mínimo 3 caracters"),
        description: z.string().min(5, "A descrição é obrigatória"),
        options: z.array(z.object({
            name: z.string().min(3, "O nome é obrigatório"),
            value: z.string().min(3, "O valor é obrigatório"),
        }))
    })
    
    type variableFormData = z.infer<typeof settingsSchema>
    const { handleSubmit, register, control, formState: { errors }} = useForm<variableFormData>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            options: [
                {
                    name: '',
                    value: '',
                },
                {
                    name: '',
                    value: '',
                }
            ]
        }
    })

    const {append, remove, fields} = useFieldArray({
        name: 'options',
        control
    });

    function removeOption(index: number) {
        if(fields.length > 2) {
            remove(index);
        }
    }

    const { mutate: createVariableMutate } = useMutation({
        mutationFn: createVariable,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['store']  });
            toast('Atualizado com sucesso');
            }
    });

    function handleSubmitForm(data: variableFormData) {
        createVariableMutate(data);
    }

    return(
        <form onSubmit={(handleSubmit(handleSubmitForm))}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
                <span>Nome</span>
                <Input {...register('name')} className="mt-1"/>
                {errors.name && <span className="text-destructive text-[12px]">{errors.name.message}</span>}
            </div>
            <div>
                <span>Descrição</span>
                <Input {...register("description")} className="mt-1" placeholder="Ex: Escolha a cor do item:"/>
                {errors.description && <span className="text-destructive text-[12px]">{errors.description.message}</span>}
            </div>
        </div>
        <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
                <SubHeaderSection title="Opções" description="Mínimo de 2 opções"/>
                <CreateButtonComponent type="button" onClick={() => append({name: '', value: ''})} title="Opção"/>
            </div>
            <section className="border rounded-lg p-5 mt-[-15px] space-y-5">
            {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div>
                        <span>Nome</span>
                        <div>
                            <Input {...register(`options.${index}.name`)} className="mt-1"/>
                            {errors?.options?.[index]?.name && <span className='text-destructive text-[12px]'>{errors.options[index]?.name?.message}</span>}
                        </div>
                    </div>
                    <div>
                        <span>Valor</span>
                        <div className="flex items-center gap-5">
                                <Input {...register(`options.${index}.value`)} className="mt-1"/>
                                <MdDelete className="text-destructive cursor-pointer" size={30} onClick={() => removeOption(index)}/>
                        </div>
                        {errors?.options?.[index]?.value && <span className='text-destructive text-[12px]'>{errors.options[index]?.value?.message}</span>}
                    </div>
                    
                </div>
            ))}
            </section>
        </div>

        <div className="mt-5 p-5 flex justify-end">
            <Button type="submit">Guardar</Button>
        </div>
        </form>
    )
}