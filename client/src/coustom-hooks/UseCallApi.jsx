import { useMutation, useQuery } from '@tanstack/react-query'
import AxiosInstance from '../configs/AxiosInstance'

export const useFetchApi = (queryKey, url, options = {}) => {

    return useQuery({
        queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
        queryFn: async () => await AxiosInstance.get(url),
        ...options,
    })
}

export const useMutateApi = (mutationFunction, options = {}) => {

    return useMutation({
        mutationFn: mutationFunction,
        ...options
    })

}