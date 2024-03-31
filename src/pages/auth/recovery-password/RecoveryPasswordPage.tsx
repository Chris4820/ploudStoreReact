import { CgSpinner } from "react-icons/cg";
import { motion } from 'framer-motion';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Link } from 'react-router-dom';


export default function RecoveryPasswordPage() {

    return (
        <section className=" h-full flex flex-col gap-5">
            <div className="text-center">
                <h1 className="font-bold text-3xl">Esqueçeu a senha?</h1>
                <p className="text-[15px]">Digite seu email para continuar</p>
            </div>
                <motion.form className="space-y-6 mt-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}>
                <div>
                    <label htmlFor='email' className='block font-semibold text-[14px]'>Email:</label>
                    <Input id='email' className='mt-2' placeholder='chrismoreiraa02@gmail.com' />
                </div>
                <div className='w-full mt-10'>
                    <Button className='text-base w-full mt-5'>
                        {0<1 ? (
                            <CgSpinner className='animate-spin' size={24}/>
                        ): (
                            'Recuperar password'
                        )}
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
