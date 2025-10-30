import type { RegisterUserPayload, loginPayload, FindUserByEmailPayload } from './type';
import axios from 'axios';
import { deploymentUrl } from '@/config/const';
axios.defaults.withCredentials = true;


export async function registerUser(payload: RegisterUserPayload) {
    const response = await axios.post(`${deploymentUrl}/user/auth/register`, payload);
    return response.data;
}
export async function login(data: loginPayload) {
    const response = await axios.post(`${deploymentUrl}/user/auth/login`,
        { ...data }, { withCredentials: true });
    return response.data;
}
export async function findUserByEmail(data: FindUserByEmailPayload) {
    const response = await axios.post(`${deploymentUrl}/user/find-by-email`, data);
    return response.data;
}
