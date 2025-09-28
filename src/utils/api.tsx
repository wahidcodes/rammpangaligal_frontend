import axios from 'axios';

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL
})

/*
api.interceptors.request.use(
    (config : any) => {
        //@ts-ignore
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        }
    },
    (err) => {Promise.reject(err)}
)
*/

export default api;