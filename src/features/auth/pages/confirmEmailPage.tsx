import { CgSpinner } from "react-icons/cg";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { useConfirmEmailUser } from "../mutations/confirmEmailMutation";
import { toast } from "sonner";


export default function ConfirmEmailPage() {
    const params = useParams();
    const emailToken = params.emailToken;



    const { mutate: confirmEmail, isPending} = useConfirmEmailUser();

    async function onSubmitForm() {
        if(!emailToken) {
            toast("Parece que você está tentando verificar um email sem o token");
            return;
        }
        confirmEmail(emailToken)
    }

    return (
        <section className="h-full flex flex-col justify-center items-center">
            <div className="text-center">
                <h1 className="font-bold text-3xl mb-4">Confirmando seu email</h1>
                <p className="mb-4">Olá! Clique no botão abaixo para confirmar seu email</p>
                <Button 
                    className="my-5"
                    onClick={() => onSubmitForm()}
                    disabled={isPending}
                >
                    {isPending ? <CgSpinner className="animate-spin inline-block mr-2" size={20} /> : 'Confirmar Email'}
                </Button>
            </div>
            <div className="absolute bottom-5">
                <Link className="text-[15px] text-blue-500" to={'/auth/login'}>Voltar para o login</Link>
            </div>
        </section>
    );
}
