import type { GamePayload } from './type';
import axios from 'axios';
import { deploymentUrl } from '@/config/const';
axios.defaults.withCredentials = true;

export async function enterGame({ userId }: GamePayload) {
    const response = await axios.post(`${deploymentUrl}/game/enter-game`, { userId });
    return response.data;
}

export async function winGame({ userId }: GamePayload) {
    const response = await axios.post(`${deploymentUrl}/game/win-game`, { userId });
    return response.data;
}
