import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://node-heat.vercel.app/',
});
