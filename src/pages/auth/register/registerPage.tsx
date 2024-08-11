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
import { t } from 'i18next';
import FormLayoutAuth from '../../../layouts/auth/formLayout';


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
        try {
            const response = await postRegisterUser(data);
            const errorMessage = response.data.message;
            toast(errorMessage);
            // Faça o que precisar com a resposta, como redirecionar para outra página
        } catch (error : any) {
            console.error('Erro ao fazer login:', error.response.data);
            const errorMessage = error.response.data.message;
            toast(errorMessage);
        }finally {
            setLoading(false)
        }
    };

    return (
            <FormLayoutAuth 
                title={t("auth.registerPage.welcome")}
                description={t("auth.registerPage.description")}>

                <motion.form className="space-y-4 mt-5"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit(createUser)}>
                <div>
                    <label htmlFor='name' className='block font-semibold text-[14px]'>{t("setup.name")}:</label>
                    <Input {...register('name')} id='name' className='mt-2' placeholder='Chris Moreira' />
                    {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                </div>
                <div>
                    <label htmlFor='email' className='block font-semibold text-[14px]'>{t("setup.email")}:</label>
                    <Input {...register('email')} id='email' className='mt-2' placeholder='chrismoreiraa02@gmail.com' />
                    {errors.email && <span className='text-destructive text-[12px]'>{errors.email.message}</span>}
                    
                </div>
                <div className='mt-5'>
                    <label htmlFor='password' className="block font-semibold text-[14px]">{t("setup.password")}:</label>
                    <Input {...register('password')} type='password' id='password' placeholder='Coloque sua password' className="mt-2"/>
                    {errors.password && <span className='text-destructive text-[12px]'>{errors.password.message}</span>}
                </div>
                <div className='mt-5'>
                    <label htmlFor='confirmpassword' className="block font-semibold text-[14px]">{t("confirm")} {t("setup.password")}:</label>
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
                    {t("accepted")} {t("auth.registerPage.terms")}
                    </label>
                </div>
                {errors.terms && <span className='text-destructive text-[12px] absolute'>{errors.terms.message}</span>}
                </div>
                <div className='w-full mt-10'>
                    <Button disabled={loading} type='submit' className='text-base w-full mt-5'>
                        {loading && (
                            <CgSpinner className='animate-spin' size={20}/>
                        )}
                            Register
                        </Button>
                </div>
            </motion.form>
            <div className='w-full text-center'>
                <p>{t("auth.registerPage.haveAccount")} <Link className='hover:underline text-blue-500' to={'../login'}>{t("auth.registerPage.login")}</Link>.</p>
            </div>
            </FormLayoutAuth>
    );
}
