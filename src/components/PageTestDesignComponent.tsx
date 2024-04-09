

type PageTestDesignComponent = {
    primaryColor: string,
    secondaryColor: string,
    logoImage: string,
    backgroundImage: string,
    backgroundSize: string,
}



export default function PageTestDesignComponent({primaryColor, secondaryColor, logoImage, backgroundImage, backgroundSize} : PageTestDesignComponent) {

    const primaryColorStyle = {
        backgroundColor: primaryColor // Define a cor de fundo com base na cor selecionada
    };
    const secondaryColorStyle = {
        backgroundColor: secondaryColor // Define a cor de fundo com base na cor selecionada
    };
    return(
    <div className="rounded-md p-5 border">
        <header style={primaryColorStyle} className="h-20 rounded-t-md relative">
            {backgroundImage && (
                <img src={backgroundImage} alt="Background" style={{ backgroundSize}} className="absolute w-full h-full"/>
            )}
            <div className="container w-full h-full flex justify-between items-center absolute">
                <div className={`h-10 w-10 rounded-md ${!logoImage && 'bg-muted'}`}>
                    {logoImage && (
                        <img src={logoImage} alt="Logo" className="object-fill w-full h-full"/>
                    )}
                </div>
                <div style={secondaryColorStyle} className="h-5 w-20 rounded-md">

                </div>
            </div>
            
        </header>
        <div className="mt-5 grid grid-cols-6 gap-2">
            <div className="h-auto bg-muted space-y-1 p-2 rounded-md col-span-2">
                <div style={primaryColorStyle} className="h-8 rounded-md text-center">
                    <h1>...</h1>
                </div>
                <div className="h-8 rounded-md text-center bg-muted">
                    <h1>...</h1>
                </div>
                <div className="h-8 rounded-md text-center bg-muted">
                    <h1>...</h1>
                </div>
                <div className="h-8 rounded-md text-center bg-muted">
                    <h1>...</h1>
                </div>
            </div>
                <div className="col-span-4">
                    <div className="h-[4rem] grid grid-cols-3 gap-2">
                        <div className="flex flex-col p-2 rounded-md bg-muted"/>
                        <div className="flex flex-col p-2 rounded-md bg-muted"/>
                        <div className="flex flex-col p-2 rounded-md bg-muted"/>
                    </div>
                    <div className="h-[4rem] grid grid-cols-3 gap-2 mt-2">
                        <div className="flex flex-col p-2 rounded-md bg-muted"/>
                        <div className="flex flex-col p-2 rounded-md bg-muted"/>
                        <div className="flex flex-col p-2 rounded-md bg-muted"/>
                    </div>
                </div>
        </div>
    </div>
    )
}