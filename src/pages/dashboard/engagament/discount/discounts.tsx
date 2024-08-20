import { MdOutlineAddCircle } from "react-icons/md";
import HeaderSection from "../../../../components/commons/Header";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import EditorComponent from "../../../../components/ui/editor";
import { useState } from "react";
import axiosStore from "../../../../lib/axios/axiosStore";
import PaymentModal from "../../../../components/modal/renovPlanModal";
import PaymentDialog from "../../../../components/modal/renovPlanModal";



export default function DiscountPage() {
    const navigate = useNavigate();

    const [editorContent, setEditorContent] = useState<string>('');


    async function createPayment() {
      try {
        const response = await axiosStore.post('/create-stripe')

        const { url } = await response.data;

            if (url) {
                window.location.href = url; // Redireciona para o Stripe
            }

      } catch (error) {
        console.log(error);
      }
    }

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

    return(
        <>
        <div className="flex justify-between items-center">
            <HeaderSection title="Descontos" description="Crie novos descontos para sua loja!"/>
            <Button onClick={() => navigate('create')} className="gap-1 items-center">
                <MdOutlineAddCircle className="mt[1px]" size={18}/>
                Desconto
            </Button>
        </div>
        <PaymentDialog key={1}/>
          <Button>Criar pagamento</Button>

        <div>
      <h1>Editor TinyMCE em React</h1>
      <EditorComponent
        value={editorContent}
        onEditorChange={handleEditorChange}
      />
      <div>
        <h2>Conteúdo do Editor:</h2>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>
      <div>
        {editorContent}
      </div>
    </div>
        </>
    )
}