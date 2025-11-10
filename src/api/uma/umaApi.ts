import type { ApiResponseType } from '@/types/apiResponseType';
import type { Uma } from '@/types/Uma';
import axios from 'axios';
import { deploymentUrl } from '@/config/const';
axios.defaults.withCredentials = true;

export async function getUma(offset: number = 0, limit: number = 27)
    : Promise<ApiResponseType<Uma>> {

    const queryParams = new URLSearchParams({
        offset: offset.toString(),
        limit: limit.toString(),
    })

    const response = await axios.get(`${deploymentUrl}/uma/uma-list?${queryParams}`);
    return response.data;
};

export async function getUmaById(id: string) {
    const response = await axios.get(`${deploymentUrl}/uma/uma-list/${id}`);
    return response.data;
};
