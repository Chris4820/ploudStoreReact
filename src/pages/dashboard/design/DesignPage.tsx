import HeaderSection from "../../../components/commons/Header";
import ImageUpload from "../../../components/imageUploadTest";
import { useEffect, useState } from "react";
import ColorPickerComponent from "../../../components/colorPickerComponent";
import { useGetDesign } from "../../../api/store/store";
import { Button } from "../../../components/ui/button";
import { postDesign } from "../../../api/req/store/design";
import { toast } from "sonner";



export default function DesignPage() {
    const { data: design, isLoading } = useGetDesign();

    const [primaryColor, setPrimaryColor] = useState("")
    const [secondaryColor, setSecondaryColor] = useState("");

    const [logoImage, setLogoImage] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [faviconImage, setFaviconImage] = useState('');

    const [sizeBackground, setSizeBackground] = useState<'cover' | 'fill'>('fill');

    
    
    useEffect(() => {
        if(!isLoading && design) {
            setPrimaryColor(design?.secondaryColor);
            setSecondaryColor(design?.secondaryColor);
        }
    }, [isLoading])
    async function checkBakcgroundTeste(size: string) {
        if(size === "cover" || size === "fill") {
            setSizeBackground(size);
        }
    }

    async function saveDesign() {
        try {
            const response = await postDesign(primaryColor, secondaryColor);
            const responseData = response.data;
            console.log(response);
            const message = responseData.message;
            toast(message);
        } catch (error) {
            toast("Erro");
            console.log(error);
        }
    }

    console.log(faviconImage);
    return(
        <>
        <HeaderSection title="Design" description="Modifique o design de sua loja!"/>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
                        <div>
                            <label className="block font-medium mb-1">Logo da loja <span className="text-sm text-muted-foreground">Max:5MB, JPEG, PNG only</span></label>
                            <ImageUpload id="logo" onImageChange={(imageUrl) => setLogoImage(imageUrl)} MAX_SIZE_IMAGE={5 * 1024 * 1024 /* 5MB*/}/>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Background da loja <span className="text-sm text-muted-foreground">Max:5MB, JPEG, PNG only</span></label>
                            <ImageUpload id="background" 
                                onImageChange={(imageUrl) => setBackgroundImage(imageUrl)} 
                                MAX_SIZE_IMAGE={5 * 1024 * 1024 /* 5MB*/}
                                fillOrCover={sizeBackground}
                                onFillChange={(value) => checkBakcgroundTeste(value)}/>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Favicon da loja <span className="text-sm text-muted-foreground">Max:1MB, JPEG, PNG only</span></label>
                            <ImageUpload id="favicon" onImageChange={(imageUrl) => setFaviconImage(imageUrl)}  MAX_SIZE_IMAGE={1 * 1024 * 1024 /* 1MB*/}/>
                        </div>     
                    </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
                <div>
                    <label className="block font-medium mb-1">Cor primária</label>
                    <ColorPickerComponent id="Primary" color={primaryColor} onColorChange={(color) => setPrimaryColor(color)}/>
                </div>
                <div>
                    <label className="block font-medium mb-1">Cor secundária</label>
                    <ColorPickerComponent id="Primary" color={secondaryColor} onColorChange={(color) => setSecondaryColor(color)}/>
                </div>
                <div>
                    <label className="block font-medium mb-1">Pré Visualização</label>
                </div>
            </div>
            <Button onClick={() => saveDesign()}>Guardar</Button>

            <div>
                <label className="block font-medium mb-1">Templates</label>
            </div>

                    
        </>
    )
}