import axiosStore from "../../../../lib/axios/axiosStore"
import type { VariableFormData } from "../../schema/VariablesSchema";




export type VariablesProps = {
  id: number,
  slug: string,
  createdAt: string,

}


export async function createVariable(data: VariableFormData) {
  const response = await axiosStore.post('variable', { data })
  return response.data;
}


export async function getVariables() : Promise<VariablesProps[]> {
  const response = await axiosStore.get<{variables: VariablesProps[]}>('variable');
  return response.data.variables;
}

export async function updateVariable(variableId: number, data: VariableFormData) {
  const response = await axiosStore.put(`variable/${variableId}`, { data });
  return response.data;
}



export async function getVariable(variableId: number) : Promise<VariableFormData> {
  const response = await axiosStore.get<{variable: VariableFormData}>(`variable/${variableId}`);
  return response.data.variable;
}