import { zodResolver } from "@hookform/resolvers/zod";
import type { RoleFormData } from "../Schema/RoleSchema";
import RoleSchema from "../Schema/RoleSchema";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";
import { Input } from "../../../components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import SwitchPermissionComponent from "./SwitchPermission";
import { permissionsData } from "../constants/PermissionData";

type RoleFormProps = {
  initialData?: RoleFormData
  onSubmit: (data: RoleFormData) => void,
  isSubmit: boolean,
  children?: React.ReactNode,
  buttonText?: string,
}

export default function RoleFormComponent({ initialData, onSubmit, isSubmit, children, buttonText = "Criar" }: RoleFormProps) {

  const form = useForm<RoleFormData>({
    resolver: zodResolver(RoleSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      permission: []
    },
    mode: 'onSubmit',
})

  return(
    <section>
    <Form {...form}>
    <form
      className="bg-muted/50 p-5 rounded-lg space-y-5"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-5">
      <FormField
        control={form.control}
        name="name" 
        render={({ field }) => (
          <FormItem className="col-span-1">
            <FormLabel>Nome</FormLabel>
              <FormControl>
                  <Input {...field} />
              </FormControl>
              <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description" 
        render={({ field }) => (
          <FormItem className="col-span-2 mt-5 lg:mt-0">
            <FormLabel>Descrição</FormLabel>
              <FormControl>
                  <Input {...field} />
              </FormControl>
              <FormMessage />
          </FormItem>
        )}
      />
      </div>
      <FormField
        control={form.control}
        name="permission" 
        render={({ field }) => (
          <FormItem>
              <FormLabel>Permissões</FormLabel>
              <FormControl>
                <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {permissionsData.map((section) => (
                    <div key={section.category} className="w-full border p-2 rounded-md border-gray-150">
                      <h2 className="text-lg font-bold mb-3">{section.category}</h2>
                      <div className="space-y-2">
                        {section.permissions.map(({ label, value }) => (
                          <SwitchPermissionComponent
                            key={value}
                            text={label}
                            check={field.value.includes(value)}
                            onCheckedChange={(checked) => {
                              const currentPermissions = field.value;
                              const updatedPermissions = checked
                                ? [...currentPermissions, value]
                                : currentPermissions.filter(p => p !== value);
                              field.onChange(updatedPermissions);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              </FormControl>
              <FormMessage />
            </FormItem>
        )}
      />
      <div className="mt-5 flex justify-end gap-5">
        {children && children}
        <SubmitButton text={buttonText} isLoading={isSubmit} enable={!form.formState.isDirty}/>
        
      </div>
    </form>    
    </Form>
    
    </section>
  )
}