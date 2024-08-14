import { MdOutlineAddCircle } from "react-icons/md";
import HeaderSection from "../../../../components/commons/Header";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import EditorComponent from "../../../../components/ui/editor";
import { useState } from "react";



export default function DiscountPage() {
    const navigate = useNavigate();

    const [editorContent, setEditorContent] = useState<string>('');

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