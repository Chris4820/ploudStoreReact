import { useState } from 'react';
import {useForm } from 'react-hook-form';
import { CgSpinner } from "react-icons/cg";
import { motion } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Link } from 'react-router-dom';
import { UserRegisterProps, postRegisterUser } from '../../../api/req/auth';


export default function RegisterPage() {
    const [loading, setLoading] = useState(false);

    const registerSchema = z.object({
        name: z.string().min(3, "O email precisa ter pelo menos 3 caracteres"),
        email: z.string().min(3, "O email precisa ter pelo menos 3 caracteres").email('Formato email errado'),
        password: z
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .regex(/[@#$%&*!?.]/, "A senha deve conter pelo menos 1 caractere especial")
        .regex(/[A-Z]/, "A senha deve conter pelo menos 1 letra maiúscula")
        .regex(/[0-9]/, "A senha deve conter pelo menos 1 número"),
        confirmPassword: z.string(),
        terms: z.literal<boolean>(true, { errorMap: () => ({ message: "Você precisa aceitar os termos!", }), })
        }).refine(({password, confirmPassword}) => password === confirmPassword, {
            message: "As senhas não coicidem",
            path:['confirmPassword']
    })
    type registerUserFormData = z.infer<typeof registerSchema>

    const { handleSubmit, register, formState: { errors }} = useForm<registerUserFormData>({
        resolver: zodResolver(registerSchema),
    })

    const createUser = async (data : UserRegisterProps, e:any) => {
        e.preventDefault();
        setLoading(true);
        console.log('Submetendo formulário...');
        try {
            const response = await postRegisterUser(data);
            const errorMessage = response.data.message;
            toast(errorMessage);
            // Faça o que precisar com a resposta, como redirecionar para outra página
        } catch (error : any) {
            console.error('Erro ao fazer login:', error.response.data);
            const errorMessage = error.response.data.message;
            toast(errorMessage);
        }
        setLoading(false);
    };

    return (
        <section className="h-full flex flex-col gap-5">
            <div className="text-center">
                <h1 className="font-bold text-3xl">Bem-vindo</h1>
                <p className="text-[15px]">Faça registro para acessar o painel</p>
            </div>
                <motion.form className="space-y-4 mt-5"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit(createUser)}>
                <div>
                    <label htmlFor='name' className='block font-semibold text-[14px]'>Nome:</label>
                    <Input {...register('name')} id='name' className='mt-2' placeholder='Chris Moreira' />
                    {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                </div>
                <div>
                    <label htmlFor='email' className='block font-semibold text-[14px]'>Email:</label>
                    <Input {...register('email')} id='email' className='mt-2' placeholder='chrismoreiraa02@gmail.com' />
                    {errors.email && <span className='text-destructive text-[12px]'>{errors.email.message}</span>}
                    
                </div>
                <div className='mt-5'>
                    <label htmlFor='password' className="block font-semibold text-[14px]">Password:</label>
                    <Input {...register('password')} type='password' id='password' placeholder='Coloque sua password' className="mt-2"/>
                    {errors.password && <span className='text-destructive text-[12px]'>{errors.password.message}</span>}
                </div>
                <div className='mt-5'>
                    <label htmlFor='confirmpassword' className="block font-semibold text-[14px]">Confirmar Password:</label>
                    <Input {...register('confirmPassword')} type='password' id='confirmpassword' placeholder='Coloque sua password' className="mt-2"/>
                    {errors.confirmPassword && <span className='text-destructive text-[12px]'>{errors.confirmPassword.message}</span>}

                </div>
                <div>
                <div className="flex items-center space-x-2">
                <Input {...register('terms')} className='w-4 h-4 accent-primary' 
                type='checkbox' id="terms" />
                    <label htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                    Accept terms and conditions
                    </label>
                </div>
                {errors.terms && <span className='text-destructive text-[12px] absolute'>{errors.terms.message}</span>}
                </div>
                <div className='w-full mt-10'>
                    <Button type='submit' className='text-base w-full mt-5'>
                        {loading ? (
                            <CgSpinner className='animate-spin' size={24}/>
                        ) : (
                            'Criar conta'
                        )}
                        </Button>
                </div>
            </motion.form>
            <div className='w-full text-center'>
                <p>Já tem uma conta? <Link className='hover:underline text-blue-500' to={'../login'}>Faça login</Link>.</p>
            </div>
        </section>
    );
}
