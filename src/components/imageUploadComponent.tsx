import { Button } from "./ui/button";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";



type ImageUploadProps = {
  imageUrl: string | null,
  onImageChange: (file: File | null) => void;
  MAX_SIZE_IMAGE: number,
}


export default function ImageUploadComponent({imageUrl, onImageChange, MAX_SIZE_IMAGE} : ImageUploadProps) {

  const [image, setImage] = useState(imageUrl || "");

  function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log(MAX_SIZE_IMAGE * 1024 * 1024);
    if (file.size > MAX_SIZE_IMAGE * 1024 * 1024) { // MAX_SIZE_IMAGE em MB
      toast('Imagem grande, tente com outra!');
      return;
    }
    setImage(URL.createObjectURL(file));
    onImageChange(file);  // Pass the File instead of a string URL
  }


  function deleteImage() {
    setImage('');
    onImageChange(null);  // Pass null when the image is removed
}
  return(
    <>
    {image ? (
      <>
      <div className="relative flex items-center justify-center overflow-hidden rounded-md border">
        <img src={image}/>
      </div>
      <div className="mt-2 flex justify-end">
        <Button 
          onClick={() => deleteImage()} 
          type="button" 
          variant={"destructive"}>
            Remover
        </Button>
      </div>
      </>
    ) : (
      <div className="flex cursor-pointer flex-col items-center justify-center rounded border border-dashed py-16 text-center text-muted-foreground">
        <input 
          accept="image/*" 
          multiple 
          type="file" 
          style={{ display: 'none'}} 
          onChange={uploadImage}
          id="file-upload"
        />
        <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="48px" width="48px" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56"></path>
            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M320 255.79l-64-64-64 64m64 192.42V207.79"></path>
          </svg>
          <span className="text-lg font-semibold mt-2">Clique ou arraste para fazer upload</span>
          <span className="text-sm">Arraste ou <span className="text-blue-500 hover:underline">selecione do computador</span>.</span>
        </label>
      </div>
    )}
    </>
  )
}