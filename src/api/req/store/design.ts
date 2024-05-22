import axiosStore from "../../../lib/axios/axiosStore";


export type DesignProps = {
    primaryColor: number,
    secondaryColor: string,
}


export async function getDesign(): Promise<DesignProps> {
    const response = await axiosStore.get<{design: DesignProps}>('design');
    return response.data.design; // Obtemos o primeiro item do array
}

export async function postDesign(primaryColor : string, secondaryColor: string) {
    try {
        const response = await axiosStore.post('design', {
            primaryColor: primaryColor,
            secondaryColor: secondaryColor,
        });
        return response;
    } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
        throw error;
    }
}