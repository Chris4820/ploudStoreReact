import { useForm } from 'react-hook-form';
import { CgSpinner } from "react-icons/cg";
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner';
import { Link, useParams } from 'react-router-dom';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import resetPasswordSchema, { type resetPasswordSchemaFormData } from '../schemas/ResetPasswordSchema';
import { useResetPasswordUser } from '../mutations/resetPasswordMutation';


export default function ResetPasswordPage() {
    const params = useParams();
    const { passwordToken } = params;

    const { handleSubmit, register, formState: { errors }, getValues} = useForm<resetPasswordSchemaFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            token: passwordToken,
        }
    })

    const { mutate: resetPassword, isPending} = useResetPasswordUser();

    async function onSubmitForm(data : resetPasswordSchemaFormData) {
        if(!getValues("token")) {
            toast("Sem passwordToken!");
            return;
        }
        resetPassword(data);
    }

    return (
        <section className=" h-full flex flex-col gap-5">
            <div className="text-center">
                <h1 className="font-bold text-3xl">Redefinir senha</h1>
                <p className="text-[15px]">Digite aqui sua nova senha!</p>
            </div>
                <motion.form className="space-y-6 mt-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit(onSubmitForm)}
                noValidate>
                <div>
                    <label htmlFor='password' className='block font-semibold text-[14px]'>Password:</label>
                    <Input {...register('password')} type='password' id='password' className='mt-2' placeholder='chrismoreiraa02@gmail.com' />
                    {errors.password && <span className='text-destructive text-[12px]'>{errors.password.message}</span>}
                </div>
                <div>
                    <label htmlFor='confirmPassword' className='block font-semibold text-[14px]'>Confirm Password:</label>
                    <Input {...register('confirmPassword')} type='password' id='confirmPassword' className='mt-2' placeholder='chrismoreiraa02@gmail.com' />
                    {errors.confirmPassword && <span className='text-destructive text-[12px]'>{errors.confirmPassword.message}</span>}
                </div>
                <div className='w-full mt-10'>
                    <Button type='submit' disabled={isPending} className='text-base w-full mt-5'>
                        {isPending ? (
                            <CgSpinner className='animate-spin' size={24}/>
                        ) : (
                            'Redefinir password'
                        )}
                        </Button>
                </div>
            </motion.form>
            <div className='w-full text-center flex flex-col gap-3'>
                <p>Lembrou da password? <Link className='hover:underline text-blue-500' to={'/auth/login'}>Faça login</Link>.</p>
            </div>
        </section>
    );
}
