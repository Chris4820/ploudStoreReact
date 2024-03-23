

type headerCreateStoreProps = {
    currentStep: number,
}

const steps = [
    { stepNumber: 1, description: 'Informações da loja' },
    { stepNumber: 2, description: 'Escolha o jogo' },
    { stepNumber: 3, description: 'Escolha o template' }
];



export default function HeaderCreateStoreSection({currentStep} : headerCreateStoreProps) {

    return(
        <div className="grid grid-cols-3">
            {steps.map((step, index) => (
                <div key={index} className={`flex gap-2 border p-4 last:rounded-tr-lg first:rounded-tl-lg justify-center 
                ${currentStep === step.stepNumber && 'bg-muted'} ${currentStep > step.stepNumber && 'bg-primary text-white duration-1000 ease-in-out'}`}>
                    <h1 className="font-semibold">Step {step.stepNumber}</h1>
                    <p className="hidden lg:block">{step.description}</p>
                </div>
            ))}
        </div>
    )
}