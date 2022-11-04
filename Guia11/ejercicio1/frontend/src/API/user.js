import { axiosInstance } from "./axiosConfig";

export async function userLogin(userData) {
    
    const res = await axiosInstance({
        method: "post",
        url: "/user/login",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: userData
    });

    return res;
}

export async function getProfile(id, token) {
    const res = await axiosInstance({
        method: 'get',
        url: `/user/profile/${id}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + token
        }
    });

    return res;
}

export async function createNewUser(userData) {
    const res = await axiosInstance({
        method: 'post',
        url: '/user/sign_up',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: userData
    });

    return res;
}

export async function getAllUsers(token) {
    const res = await axiosInstance({
        method: 'get',
        url: '/user',
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return res;
}