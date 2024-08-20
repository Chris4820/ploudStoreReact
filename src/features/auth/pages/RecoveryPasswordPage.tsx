import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import recoveryPasswordSchema, { type recoveryPasswordSchemaFormData } from '../schemas/RecoveryPasswordSchema';
import { useRecoveryPassword } from '../mutations/recoveryPasswordMutation';


export default function RecoveryPasswordPage() {


    const { handleSubmit, register, formState: { errors }} = useForm<recoveryPasswordSchemaFormData>({
        resolver: zodResolver(recoveryPasswordSchema),
    })

    const { mutate: recoveryPassword, isPending, isSuccess} = useRecoveryPassword();

    function onSubmitForm(data: recoveryPasswordSchemaFormData) {
        recoveryPassword(data);
    }

    return (
        <section className=" h-full flex flex-col gap-5">
            <div className="text-center">
                <h1 className="font-bold text-3xl">Esqueçeu a senha?</h1>
                <p className="text-[15px]">Digite seu email para continuar</p>
            </div>
                <motion.form onSubmit={(handleSubmit(onSubmitForm))} className="space-y-6 mt-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}>
                <div>
                    <label htmlFor='email' className='block font-semibold text-[14px]'>Email:</label>
                    <Input {...register("email")} id='email' className='mt-2' placeholder='chrismoreiraa02@gmail.com' />
                    {errors.email && <span className='text-destructive text-[12px]'>{errors.email.message}</span>}
                </div>
                <div className='w-full mt-10'>
                    <Button type='submit' disabled={isPending || isSuccess} className='text-base items-center flex gap-1 w-full mt-5'>
                        {isPending && (
                            <CgSpinner className='animate-spin' size={20}/>
                        )}
                        Recuperar password
                        </Button>
                </div>
            </motion.form>
            <div className='w-full text-center flex flex-col gap-3'>
                <p>Ainda não tem uma conta? <Link className='hover:underline text-blue-500' to={'../register'}>Crie uma agora</Link>.</p>
                <p>Já tem uma conta? <Link className='hover:underline text-blue-500' to={'../login'}>Faça login</Link>.</p>
            </div>
        </section>
    );
}
