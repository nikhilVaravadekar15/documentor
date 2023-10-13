import { TFilebody } from "@/types";
import axios, { AxiosRequestConfig } from "axios";

export const API_BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL!
export const axiosRequestConfig: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
}


export async function uploadFile(file: File) {
    const formData = new FormData()
    formData.set('file', file)
    return await axios.post(
        '/api/upload',
        formData,
        {
            ...axiosRequestConfig,
            headers: {
                ...axiosRequestConfig.headers,
                'Content-Type': 'multipart/form-data'
            }
        }
    )
}

export async function createVectors({ id, file_key, file_name }: TFilebody) {
    return await axios.post(
        '/api/vectors',
        {
            id: id,
            file_key: file_key,
            file_name: file_name,
        },
        axiosRequestConfig
    )
}
