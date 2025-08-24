import type { Uma } from '@/types/Uma';
import axios from 'axios';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getUma(): Promise<Uma[]> {
    await sleep(3000)
    const response = await axios.get<Uma[]>('/api/uma');
    return response.data;
}