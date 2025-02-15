import { useState, type ChangeEvent } from "react";
import { MdImageNotSupported } from "react-icons/md";
import { toast } from "sonner";

type ImageUploadProps = {
  id: string;
  onImageChange: (file: File | null) => void;
  imageUrl?: string;
  MAX_SIZE_IMAGE: number;
};



export default function UploadImageComponent({ id, onImageChange, imageUrl, MAX_SIZE_IMAGE }: ImageUploadProps) {
  const [imageUrll, setImageUrl] = useState(imageUrl || "");
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  console.log("ImageUrl" + imageUrl);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("Sim 1")
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE_IMAGE * 1024 * 1024) { // MAX_SIZE_IMAGE em MB
      toast('Imagem grande, tente com outra!');
      return;
    }
    console.log("Sim 2")
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (fileType !== "png" && fileType !== "jpeg") {
      toast('Apenas são permitidos imagens!');
      return;
    }
    
    setImageUrl(URL.createObjectURL(file));
    onImageChange(file);  // Pass the File instead of a string URL
  };

  const resetImage = () => {
    setImageUrl('');
    setFileInputKey(Date.now());
    onImageChange(null);  // Pass null when the image is removed
};

  const handleImageClick = () => {
    const input = document.getElementById(id) as HTMLInputElement;
    input?.click();
  };

  return (
    <div className="w-full sm:w-auto h-auto p-5 flex justify-start gap-5 border rounded-md">
      <div onClick={handleImageClick} className="cursor-pointer w-20 h-20 p-0.5 relative">
        {imageUrll ? (
          <img src={imageUrll} alt="Uploaded Image" className="object-fill w-full h-full rounded-md" />
        ) : (
          <div className="border-dashed border-2 flex justify-center items-center rounded-md w-full h-full">
            <MdImageNotSupported size={36} />
          </div>
        )}
        <input
          type="file"
          id={id}
          key={fileInputKey}
          accept="image/jpeg, image/png"
          onChange={handleImageUpload}
          className="absolute inset-0 opacity-0 cursor-pointer hidden"
        />
      </div>

      <div>
        {imageUrll ? (
          <div className="space-y-1">
            <h1>Nome da imagem</h1>
            <label onClick={resetImage} className="text-sm cursor-pointer text-destructive">Remover imagem</label>
          </div>
        ) : (
          <>
            <h1>Selecione uma imagem</h1>
            <label className="text-sm">Adicione uma imagem para sua loja</label>
          </>
        )}
      </div>
    </div>
  );
}
