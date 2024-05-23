import { CgSpinner } from "react-icons/cg";
import { motion } from 'framer-motion';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Link, useNavigate } from "react-router-dom";
import { UserLoginProps, postLoginUser } from "../../../api/req/auth";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createAuthToken } from "../../../lib/utils";
import { t } from "i18next";


export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loginSchema = z.object({
        email: z.string().min(3, "O email precisa ter pelo menos 3 caracteres").email('Formato email errado'),
        password: z.string().min(6, 'A senha precisa ter 6 caracteres'),
        remember: z.boolean()
    })
    type loginUserFormData = z.infer<typeof loginSchema>
    const { handleSubmit, register, formState: { errors }} = useForm<loginUserFormData>({
        resolver: zodResolver(loginSchema),
    })



    async function loginUser(data : UserLoginProps, e: any) {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await postLoginUser(data);
            const responseData = response.data;
            const message = responseData.message;
            if(response.status === 200) {
                const authToken = responseData.authToken;
                await createAuthToken(authToken);
                setLoading(false);
                toast(message);
                return navigate('/');
            }
            toast(message);
        } catch (error : any) {
            setLoading(false);
            console.error('Erro ao fazer login:', error.response.data);
            const errorMessage = error.response.data.message;
            toast(errorMessage);
        }
        setLoading(false);
    }

    return (
        <section className="h-full flex flex-col gap-5">
            <div className="text-center">
                <h1 className="font-bold text-3xl">{t("auth.loginPage.welcomeback")}</h1>
                <p className="text-[15px]">{t("auth.loginPage.description")}</p>
            </div>
                <motion.form className="space-y-6 mt-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit(loginUser)}>
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
                <div className='w-full flex justify-between gap-5'>
                    <div className="flex items-center space-x-2">
                    {errors.remember && <span className='text-destructive text-[12px]'>{errors.remember.message}</span>}
                        <div className="flex items-center space-x-2">
                        <Input className='w-4 h-4 accent-primary' 
                        type='checkbox' {...register('remember')} id="remember" />
                        <label htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                        {t("auth.loginPage.rememberMe")}
                        </label>
                        </div>
                    </div>
                <Link className='hover:underline' to={'../recovery-password'}>{t("auth.loginPage.forgot")}</Link>
                </div>
                <div className='w-full mt-10'>
                    <Button disabled={loading} type="submit" className='text-base w-full mt-5'>
                        {loading ? (
                            <CgSpinner className='animate-spin' size={24}/>
                        ) : (
                            t("auth.loginPage.login")
                        )}
                    </Button>
                </div>
            </motion.form>
            <div className='w-full text-center'>
                <p>{t("auth.noAccount")} <Link className='hover:underline text-blue-500' to={'../register'}>{t("auth.createOne")}</Link>.</p>
            </div>
        </section>
    );
}
