import { motion } from 'framer-motion';
import { Input } from '../../../components/ui/input';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema, { type loginSchemaFormData } from "../schemas/LoginSchema";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";
import { useLoginUser } from '../../../Internal/auth/loginMutation';


export default function LoginPage() {

    const { handleSubmit, register, formState: { errors }} = useForm<loginSchemaFormData>({
        resolver: zodResolver(loginSchema),
    })

    const {mutate: loginUser, isPending} = useLoginUser();


    function onSubmitForm(data: loginSchemaFormData) {
        loginUser(data);
    }


    return (
        <section className="h-full flex flex-col gap-5">
            <div className="text-center">
                <h1 className="font-bold text-3xl">Bem-vindo de volta</h1>
                <p className="text-[15px]">Faça login para acessar o painel</p>
            </div>
                <motion.form className="space-y-6 mt-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit(onSubmitForm)}>
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
                <div className='w-full flex justify-between gap-5'>
                    <div className="flex items-center space-x-2">
                    {errors.remember && <span className='text-destructive text-[12px]'>{errors.remember.message}</span>}
                        <div className="flex items-center space-x-2">
                        <Input className='w-4 h-4 accent-primary' 
                        type='checkbox' {...register('remember')} id="remember" />
                        <label htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                        Lembrar de mim
                        </label>
                        </div>
                    </div>
                <Link className='hover:underline' to={'../recovery-password'}>Esqueceu a senha?</Link>
                </div>
                <div className='w-full mt-10'>
                    <SubmitButton
                    isLoading={isPending}
                    text="Login"
                    enable={false}
                    className="w-full"/>

                </div>
            </motion.form>
            <div className='w-full text-center'>
                <p>Ainda não tem uma conta? <Link className='hover:underline text-blue-500' to={'../register'}>Crie uma agora</Link>.</p>
            </div>
        </section>
    );
}
