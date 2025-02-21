import axiosUser from "../../lib/axios/axiosUser";



export type UserInformationProps = {
    name: string,
    email: string,
    theme: string,
    language: string,
}



export async function getUserInformation(): Promise<UserInformationProps> {
    const response = await axiosUser.get<{ userInformation: UserInformationProps }>('user');
    return response.data.userInformation;
}

export async function changeNameUser(name: string) {
    const response = await axiosUser.put(`userName`, {
        name: name,
    });
    return response;
}

export async function changeThemeReq(theme: string) {
    const response = await axiosUser.put('theme', {
        theme,
    })
    return response;
}
