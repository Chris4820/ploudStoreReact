import {useForm } from 'react-hook-form';
import { CgSpinner } from "react-icons/cg";
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { t } from 'i18next';
import FormLayoutAuth from '../components/formLayout';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Link } from 'react-router-dom';
import registerSchema, { type registerSchemaFormData } from '../schemas/RegisterSchema';
import { useRegisterUser } from '../../../Internal/auth/registerMutation';


export default function RegisterPage() {

    const { handleSubmit, register, formState: { errors }} = useForm<registerSchemaFormData>({
        resolver: zodResolver(registerSchema),
    })

    const { mutate: createUser, isPending} = useRegisterUser();


    function onSubmitForm(data: registerSchemaFormData) {
        createUser(data);
    }

    return (
            <FormLayoutAuth 
                title={t("auth.registerPage.welcome")}
                description={t("auth.registerPage.description")}>

                <motion.form className="space-y-4 mt-5"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit(onSubmitForm)}>
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
                    <Button disabled={isPending} type='submit' className='text-base w-full mt-5'>
                        {isPending && (
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
