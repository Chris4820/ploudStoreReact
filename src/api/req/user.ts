import axiosUser from "../../lib/axios/axiosUser";






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
