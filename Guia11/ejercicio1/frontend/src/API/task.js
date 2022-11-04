import { axiosInstance } from "./axiosConfig";

export async function getTasksByUser(token) {
    const res = await axiosInstance({
        method: 'get',
        url: '/task',
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return res;
}

export async function getTaskBy(id ,token) {
    const res = await axiosInstance({
        method: 'get',
        url: `/task/${id}`,
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return res;
}

export async function finalizarTask(id, token) {
    const res = await axiosInstance({
        method: 'put',
        url: `/task/finalizar/${id}`,
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return res;
}

export async function deleteTask(id, token) {
    const res = await axiosInstance({
        method: 'delete',
        url: `/task/eliminar/${id}`,
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return res;
}

export async function createNewTask(data, token) {
    const res = await axiosInstance({
        method: 'post',
        url: '/task',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + token
        },
        data
    });

    return res;
}