import axiosAuth from "../../../../lib/axios/axiosAuth";
import type { recoveryPasswordSchemaFormData } from "../../schemas/RecoveryPasswordSchema";
import type { resetPasswordSchemaFormData } from "../../schemas/ResetPasswordSchema";


export type UserLoginProps = {
    email: string,
    password: string,
    remember: boolean,
}

export type UserRegisterProps = {
    name: string,
    email: string,
    password: string,
}


export async function postLoginUser(data : UserLoginProps) {
    try {
        const response = await axiosAuth.post('login', { data });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
        throw error;
    }
}

export async function postRegisterUser(data : UserRegisterProps) {
    try {
        const response = await axiosAuth.post('register', {
            name: data.name,
            email: data.email,
            password: data.password,
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
        throw error;
    }
}

export async function confirmEmailUser(emailToken: string) {
    try {
        const response = await axiosAuth.post(`confirmEmail/${emailToken}`, );
        return response.data;
    } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
        throw error;
    }
}

export async function recoveryPassword(data: recoveryPasswordSchemaFormData) {
    try {
        const response = await axiosAuth.post('recoveryPassword', {
            email: data.email,
        });
        return response.data;
    } catch (error) {
        console.log('Erro');
        throw error;
    }
}

export async function logout() {
    try {
        const response = await axiosAuth.get('logout');
        return response;
    } catch (error) {
        console.log('Erro');
        throw error;
    }
}

export async function resetPassword(data: resetPasswordSchemaFormData) {
    try {
        const response = await axiosAuth.post(`recoveryPassword/${data.token}`, {
            password: data.password,
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
        throw error;
    }
}