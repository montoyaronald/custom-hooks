import { useEffect } from "react";
import { useState } from "react";


const localCache = {};

export const useFetch = ( url ) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        errorMessage: null
    });


    useEffect(() => {
        //console.log("Ejecutando");
        getFetch();
    }, [url] );


    const setIsLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        }); 
    }

    const getFetch = async () => {

        if(localCache[url]){
            console.log('Usando caché');
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            });    
            return;
        }

        setIsLoadingState();

        const resp = await fetch(url);

        if(!resp.ok){
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText
                }
            });
            return;
        }

        const data = await resp.json();

        setState({
            data,
            isLoading: false,
            hasError: false,
            error: null
        })

        // Manejo de Cache
        localCache[url] = data;
        
    }
    

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    }
}
