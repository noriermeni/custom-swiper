import { useState, useEffect } from "react";
import request from "../../utils/axiosInstance";

export type ApiResponseT = {
    data: any | Array<any>;
    error: any;
    loading: boolean;
    status: number;
}

export const useFetchHook = (url: string): ApiResponseT => {
    const [ data, setData ] = useState<any | Array<any>>();
    const [ error, setError ] = useState<any>();
    const [ status, setStatus ] = useState<number>(0);
    const [ loading, setLoading ] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            const response = await request('GET', url);
            setData(response?.data);
            setStatus(response.status);
            setLoading(false);
        } catch (e) {
            setError(e);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return { data, error, loading, status }
}