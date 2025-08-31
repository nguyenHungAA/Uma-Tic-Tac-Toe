import axios from 'axios';

const deploymentUrl = import.meta.env.VITE_BACKEND_BASE_URL;
// const localUrl = import.meta.env.VITE_BACKEND_TEST_URL;

// function sleep(ms: number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

export async function getUma() {
    const response = await axios.get(`${deploymentUrl}/api/v1/uma-list`);
    return response.data
};