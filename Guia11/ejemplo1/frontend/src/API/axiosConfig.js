import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
});

//Interceptor Response
axiosInstance.interceptors.response.use((res) => {
    return res;
}, (err)=> {
    if(err.response.status === 401) {
        localStorage.setItem("user", JSON.stringify({estado: false}))
        return Promise.reject({
            ...err.response
        });
    }

    if(err.response.status === 400) {
        return Promise.reject({
            ...err.response.data
        });
    }

    return Promise.reject(err);
});
