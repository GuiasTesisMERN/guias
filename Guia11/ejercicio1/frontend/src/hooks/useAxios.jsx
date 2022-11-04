import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

const useAxios = (url, method, payload) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const controllerRef = useRef(new AbortController());

    const cancel = () => {
        controllerRef.current.abort();
    }

    useEffect(() => {
        (async() => {
            try {
                const response = await axios.request({
                    signal: controllerRef.current.signal,
                    data: payload,
                    method,
                    url,
                })

                setData(response.data);
            } catch(error) {
                setError(error.mess)
            } finally {
                setLoading(true);
            }
        })();
    }, []);

    return { cancel, data, error, loading };

}