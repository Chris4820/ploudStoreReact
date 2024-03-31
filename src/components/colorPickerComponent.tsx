



type ColorPickerProps = {
    id: string,
    onColorChange: (imageUrl: string) => void,
    color: string,
}

export default function ColorPickerComponent({ id, onColorChange, color } : ColorPickerProps) {

    const divStyle = {
        backgroundColor: color // Define a cor de fundo com base na cor selecionada
    };


    return(
        <div className='w-full sm:w-auto h-auto p-5 flex justify-start gap-5 border rounded-md '>
            <div style={divStyle} className={`cursor-pointer w-20 h-20 p-0.5 relative rounded-md`}>
                <input 
                    type="color" 
                    id={id} 
                    key={id}
                    onChange={(e) => onColorChange(e.target.value)} 
                    className="absolute bottom-0 cursor-pointer opacity-0 w-full h-full"
                />
            </div>
            <div className="flex flex-col relative">
                <h1>Mude a cor de sua loja</h1>
                <span>Cor atual: <span className="text-muted-foreground">{color}</span></span>
                <span className="text-sm text-muted-foreground absolute bottom-0">Clique para mudar</span>
            </div>
        </div>
    )
}