import axios from 'axios';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getUma() {
    await sleep(3000)
    const response = await axios.get('/api/uma');
    return response.data;
}