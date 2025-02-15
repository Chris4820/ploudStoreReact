import { useState } from 'react'; // Importando useState

type ColorPickerProps = {
    onColorChange: (imageUrl: string) => void,
    color: string,
    title: string,
}

export default function ColorPickerComponent({ onColorChange, color, title } : ColorPickerProps) {
    const [selectedColor, setSelectedColor] = useState(color); // Estado para a cor selecionada

    const divStyle = {
        backgroundColor: selectedColor // Define a cor de fundo com base na cor selecionada
    };

    return(
        <div className='w-full sm:w-auto h-auto p-5 flex justify-start gap-5 border rounded-md '>
            <div style={divStyle} className={`cursor-pointer w-20 h-20 p-0.5 relative rounded-md`}>
                <input 
                    type="color" 
                    onChange={(e) => setSelectedColor(e.target.value)} // Atualiza a cor selecionada
                    onBlur={() => onColorChange(selectedColor)} // Dispara o evento ao perder o foco
                    className="absolute bottom-0 cursor-pointer opacity-0 w-full h-full"
                />
            </div>
            <div className="flex flex-col relative">
                <h1 className="font-semibold text-lg">{title}</h1>
                <span>Cor atual: <span className="text-muted-foreground">{selectedColor}</span></span>
                <span className="text-sm text-muted-foreground absolute bottom-0">Clique para mudar</span>
            </div>
        </div>
    )
}