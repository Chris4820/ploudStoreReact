import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";
import { confirmEmailUser } from "../../../../api/req/auth";


export default function ConfirmEmailPage() {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const emailToken = params.emailToken;

    async function confirmEmail() {
        setLoading(true);
        if(!emailToken) {
            setErrorMessage("Parece que você está tentando verificar um email sem o token");
            setLoading(false);
            return;
        }
        try {
            const response = await confirmEmailUser(emailToken);
            if(response.status === 200) {
                toast("Email confirmado com sucesso!")
                setLoading(false);
                return navigate('/auth/login');
            }
            toast("Algum erro...")
            setLoading(false);
            
        } catch (error) {
            setErrorMessage("Parece que o seu token não é válido, crie outro!");
            console.error(error);
            setLoading(false);
        }
    }

    return (
        <section className="h-full flex flex-col justify-center items-center">
            <div className="text-center">
                <h1 className="font-bold text-3xl mb-4">Confirmando seu email</h1>
                <p className="mb-4">Olá! Clique no botão abaixo para confirmar seu email</p>
                <Button 
                    className="my-5"
                    onClick={() => confirmEmail()}
                    disabled={loading}
                >
                    {loading ? <CgSpinner className="animate-spin inline-block mr-2" size={20} /> : 'Confirmar Email'}
                </Button>
            </div>
            {errorMessage && <span className="text-red-500 mt-2 text-[15px]">{errorMessage}</span>}
            <div className="absolute bottom-5">
                <Link className="text-[15px] text-blue-500" to={'/auth/login'}>Voltar para o login</Link>
            </div>
        </section>
    );
}
