import axios from 'axios';

let deploymentUrl = import.meta.env.VITE_BACKEND_BASE_URL;
deploymentUrl = null;
const localUrl = import.meta.env.VITE_BACKEND_TEST_URL;

// function sleep(ms: number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

export async function getUma() {
    const response = await axios.get(`${deploymentUrl || localUrl}/api/v1/uma/uma-list`);
    return response.data;
};

export async function getUmaById(id: string) {
    const response = await axios.get(`${deploymentUrl || localUrl}/api/v1/uma/uma-list/${id}`);
    return response.data;
};