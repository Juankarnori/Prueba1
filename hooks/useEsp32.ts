import { IEsp32 } from "@/interface"
import useSWR, { SWRConfiguration } from "swr"

// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

export const useEsp32 = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error, isLoading } = useSWR<IEsp32[]>(`/api${ url }`, fetcher, config)
    const { data, error, isLoading } = useSWR<IEsp32[]>(`/api${ url }`, config)

    return {
        esp32: data,
        isLoading,
        isError: error
    }

} 