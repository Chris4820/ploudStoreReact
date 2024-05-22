import { ChangeEvent } from "react";
import { MdImageNotSupported } from "react-icons/md";





export default function TestePage() {

    function handleImageUpload(e: ChangeEvent<HTMLInputElement>){
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const objectUrl = URL.createObjectURL(file);
        const imageUrl = objectUrl.substring(objectUrl.lastIndexOf('/') + 1);
        return console.log(imageUrl);
    };

    function openFileInput(id: string) {
            const input = document.getElementById(id);
            if (input) {
                input.click();
        };
    }

    return(
        <>
            <h1>Teste de componentes</h1>
            <div className="flex justify-center items-center">
                <div className="w-[300px] mt-20">
                    <div className='w-full sm:w-auto h-auto p-5 flex justify-start gap-5 border rounded-md'>
                    <div onClick={() => openFileInput("a")} className="cursor-pointer w-20 h-20 p-0.5 relative">
                        <div className='border-dashed border-2 flex justify-center items-center rounded-md w-full h-full'>
                            <MdImageNotSupported size={36}/>
                        </div>
                        <input 
                        type="file" 
                        id={"a"} 
                        key={"a"}
                        onChange={handleImageUpload}
                        accept="image/jpeg, image/png, image/webp, image/svg"  
                        className="absolute inset-0 opacity-0 cursor-pointer hidden"
                        />
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}