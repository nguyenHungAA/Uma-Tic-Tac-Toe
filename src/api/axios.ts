import axios from 'axios';

axios.defaults.withCredentials = true;
const deploymentUrl = import.meta.env.VITE_BACKEND_BASE_URL || '';

interface RegisterUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export async function registerUser(payload: RegisterUserPayload) {
    const response = await axios.post(`${deploymentUrl}/user/auth/register`, payload);
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
    const response = await axios.post(`${deploymentUrl}/user/auth/login`,
        { ...data }, { withCredentials: true });
    return response.data;
}

interface FindUserByEmailPayload {
    email: string;
    firebaseUid?: string;
    avatarUrl?: string | null;
}

export async function findUserByEmail(data: FindUserByEmailPayload) {
    const response = await axios.post(`${deploymentUrl}/user/find-by-email`, data);
    return response.data;
}

interface GamePayload {
    userId: string;
}

export async function enterGame({ userId }: GamePayload) {
    const response = await axios.post(`${deploymentUrl}/game/enter-game`, { userId });
    return response.data;
}

export async function winGame({ userId }: GamePayload) {
    const response = await axios.post(`${deploymentUrl}/game/win-game`, { userId });
    return response.data;
}