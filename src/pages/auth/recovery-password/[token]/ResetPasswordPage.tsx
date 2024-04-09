import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinner } from "react-icons/cg";
import { motion } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { passwordRecoveryUser } from '../../../../api/req/auth';


export default function ResetPasswordPage() {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const passwordToken = params.passwordToken;
    const navigate = useNavigate();

    const registerSchema = z.object({
        password: z
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .regex(/[@#$%&*!?.]/, "A senha deve conter pelo menos 1 caractere especial")
        .regex(/[A-Z]/, "A senha deve conter pelo menos 1 letra maiúscula")
        .regex(/[0-9]/, "A senha deve conter pelo menos 1 número"),
        confirmPassword: z.string(),
        }).refine(({password, confirmPassword}) => password === confirmPassword, {
            message: "As senhas não coicidem",
            path:['confirmPassword']
    })
    type registerUserFormData = z.infer<typeof registerSchema>

    const { handleSubmit, register, formState: { errors }} = useForm<registerUserFormData>({
        resolver: zodResolver(registerSchema),
    })

    async function resetPassword(data : registerUserFormData) {
        setLoading(true);
        if(!passwordToken) {
            toast("Sem passwordToken!");
            return;
        }
        try {
            const response = await passwordRecoveryUser(passwordToken, data.password);
            if(response.status === 200) {
                toast("Password alterada com sucesso!");
                setLoading(false);
                return navigate('/auth/login');
            }
        } catch (error) {
            toast("Parece que o seu token não é válido, crie outro!");
            console.error(error);
            setLoading(false);
        }
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
                onSubmit={handleSubmit(resetPassword)}
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
                    <Button type='submit' className='text-base w-full mt-5'>
                        {loading ? (
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
