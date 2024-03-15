import axiosUser from "../../lib/axios/axiosUser";



type UserInformationProps = {
    name: string,
    email: string,
    theme: string,
}




export async function getUserInformation(): Promise<UserInformationProps> {
    const response = await axiosUser.get<{userInformation: UserInformationProps[]}>('user');
    return response.data.userInformation[0]; // Obtemos o primeiro item do array
}