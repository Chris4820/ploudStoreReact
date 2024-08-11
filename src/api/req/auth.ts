import axiosAuth from "../../lib/axios/axiosAuth";


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
        const response = await axiosAuth.post('login', {
            email: data.email,
            password: data.password,
            remember: data.remember
        });
        return response;
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
        return response;
    } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
        throw error;
    }
}

export async function recoveryPassword(email: string) {
    try {
        const response = await axiosAuth.post('recoveryPassword', {
            email: email,
        });
        return response;
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

export async function passwordResetPassword(passwordToken: string, password: string) {
    try {
        const response = await axiosAuth.post(`recoveryPassword/${passwordToken}`, {
            password: password,
        });
        return response;
    } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
        throw error;
    }
}