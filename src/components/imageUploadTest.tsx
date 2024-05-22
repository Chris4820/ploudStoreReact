import { ChangeEvent, useState } from 'react';
import { MdImageNotSupported } from 'react-icons/md';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type ImageUploadProps = {
    id: string,
    onImageChange: (imageUrl: string) => void,
    defaultImage?: string,
    MAX_SIZE_IMAGE: number,
    fillOrCover?: 'fill' | 'cover'
    onFillChange?: (fillOrCover: string) => void,
}

export default function ImageUpload({ id, onImageChange,defaultImage, MAX_SIZE_IMAGE, fillOrCover, onFillChange } : ImageUploadProps) {
    const [imageUrl, setImageUrl] = useState(defaultImage ? defaultImage : "");
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        if(file.size > MAX_SIZE_IMAGE) {
            toast('Imagem grande, tente com outra!');
            return;
        }
        const fileType = file.name.split(".").pop();
        if (fileType !== "png" && fileType !== "jpeg"){
            toast('Apenas são permitidos imagens!') 
            return;
        } 
        
        setImageUrl(URL.createObjectURL(file)); // Armazena o URL da imagem
        onImageChange(URL.createObjectURL(file)); // Chama a função com o URL da imagem
    };

    const resetImage = () => {
        setImageUrl('');
        setFileInputKey(Date.now());
        onImageChange(''); // Chama a função com uma string vazia
    };

    const handleImageClick = () => {
        const input = document.getElementById(id);
        if (input) {
            input.click();
        }
    };

    return (
        <div className='w-full sm:w-auto h-auto p-5 flex justify-start gap-5 border rounded-md'>
            <div onClick={() => handleImageClick()} className="cursor-pointer w-20 h-20 p-0.5 relative">
                {imageUrl ? (
                    <img src={imageUrl} alt='Uploaded Image' className="object-fill w-full h-full rounded-md" />
                ) : (
                    <div className='border-dashed border-2 flex justify-center items-center rounded-md w-full h-full'>
                        <MdImageNotSupported size={36}/>
                    </div>
                )}
                <input 
                    type="file" 
                    id={id} 
                    key={fileInputKey}
                    accept="image/jpeg, image/png, image/webp, image/svg" 
                    onChange={handleImageUpload} 
                    className="absolute inset-0 opacity-0 cursor-pointer hidden"
                />
            </div>
            
            <div>
                {imageUrl ? (
                    <div className='space-y-1'>
                        <h1>Nome da imagem</h1>
                        <label onClick={() => resetImage()} className='text-sm cursor-pointer text-destructive'>Remover imagem</label>
                        {fillOrCover && (
                        <Select defaultValue={fillOrCover || 'cover'} onValueChange={onFillChange}>
                            <SelectTrigger className="min-w-[100px] h-8">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cover">Cover</SelectItem>
                                <SelectItem value="fill">Fill</SelectItem>
                            </SelectContent>
                        </Select>
                        )}
                    </div>
                ) : (
                    <>
                        <h1>Selecione uma imagem</h1>
                        <label className='text-sm'>Adicione uma imagem para sua loja</label>
                    </>
                )}
            </div>
        </div>
    );
};
