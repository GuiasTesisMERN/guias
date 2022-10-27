import React, { useState, useEffect, useRef, createContext } from 'react';

import axios from 'axios';

import useLocalStorage from '../hooks/useLocalStorage';

export const AxiosContext = createContext(null);

export const AxiosProvider = ({config = {}, requestInterceptors = [], responseInterceptors = [], children}) => {
    
    const instanceRef = useRef(axios.create(config));
    
    useEffect(() => {
        requestInterceptors.forEach((interceptor) => {
            instanceRef.current.interceptors.request.use(interceptor);
        });

        responseInterceptors.forEach((interceptor) => {
            instanceRef.current.interceptors.response.use(interceptor);
        });
    }, []);

    return(
        <AxiosContext.Provider value={instanceRef.current }>
            {children}
        </AxiosContext.Provider>
    )
}