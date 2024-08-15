import axiosStore from "../../../lib/axios/axiosStore";


export type VariableProps = {
    id: number,
    name: string,
    title: string,
    variable: string,
    VariablesOptions: {
        optionId: number,
        name: string,
        value: string,
    }[],
}



export async function createVariable(data: any) { //name, description, variables {name, value}
    try {
        const response = await axiosStore.post('variable', {
            name: data.name,
            description: data.description,
            variables: data.variables,
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function getVariables(): Promise<VariableProps[] | []> {
    const response = await axiosStore.get<{variables: VariableProps[] | []}>(`variables`);
    return response.data.variables || []; // Obtemos o primeiro item do array
}