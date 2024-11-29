import axios from 'axios';

export default defineNuxtPlugin(() => {
    const axiosInstance = axios.create({
        baseURL: 'http://blog-panel.suly-soft.com.www67.your-server.de/api',
        headers: { 'x-key': '2eee3f69-cd09-399f-a5b9-978d2c78c7f3' },
    });
    return {
        provide: {
            axiosInstance
        }
    }
});
