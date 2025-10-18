import type { ApiResponseType } from '@/types/apiResponseType';
import type { Uma } from '@/types/Uma';
import axios from 'axios';

axios.defaults.withCredentials = true;
let deploymentUrl = import.meta.env.VITE_BACKEND_BASE_URL;
// deploymentUrl = null;
const localUrl = import.meta.env.VITE_BACKEND_TEST_URL;

export async function getUma(offset: number = 0, limit: number = 27)
    : Promise<ApiResponseType<Uma[]>> {

    const queryParams = new URLSearchParams({
        offset: offset.toString(),
        limit: limit.toString(),
    })

    const response = await axios.get(`${deploymentUrl || localUrl}/api/v1/uma/uma-list?${queryParams}`);
    return response.data;
};

export async function getUmaById(id: string) {
    const response = await axios.get(`${deploymentUrl || localUrl}/api/v1/uma/uma-list/${id}`);
    return response.data;
};

interface RegisterUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export async function registerUser(payload: RegisterUserPayload) {
    const response = await axios.post(`${deploymentUrl || localUrl}/api/v1/user/auth/register`, payload);
    return response.data;
}

interface loginPayload {
    email?: string,
    password?: string,
    idToken?: string,
    firebaseUid?: string,
    firebaseEmail?: string | null,
}

export async function login(data: loginPayload) {
    const response = await axios.post(`${deploymentUrl || localUrl}/api/v1/user/auth/login`,
        { ...data }, { withCredentials: true });
    return response.data;
}

interface FindUserByEmailPayload {
    email: string;
    firebaseUid?: string;
    avatarUrl?: string | null;
}

export async function findUserByEmail(data: FindUserByEmailPayload) {
    const response = await axios.post(`${deploymentUrl || localUrl}/api/v1/user/find-by-email`, data);
    return response.data;
}

interface GamePayload {
    userId: string;
}

export async function enterGame({ userId }: GamePayload) {
    const response = await axios.post(`${deploymentUrl || localUrl}/api/v1/game/enter-game`, { userId });
    return response.data;
}

export async function winGame({ userId }: GamePayload) {
    const response = await axios.post(`${deploymentUrl || localUrl}/api/v1/game/win-game`, { userId });
    return response.data;
}