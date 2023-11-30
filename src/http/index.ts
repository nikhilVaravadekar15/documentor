import { TFilebody } from "@/types";
import axios, { AxiosRequestConfig } from "axios";
import { string } from "zod";

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
        '/api/document',
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

export async function getDocuments() {
    return await axios.get(
        '/api/list-documents',
        axiosRequestConfig
    )
}

export async function deleteDocument(id: string) {
    return await axios.delete(
        `/api/document?id=${id}`,
        axiosRequestConfig
    )
}

export async function getDocumentbyId(id: string) {
    return await axios.get(
        `/api/document?id=${id}`,
        axiosRequestConfig
    )
}
