import { IPerfil } from "@/interface"
import useSWR, { SWRConfiguration } from "swr"

// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

export const usePerfil = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error, isLoading } = useSWR<IEsp32[]>(`/api${ url }`, fetcher, config)
    const { data, error, isLoading } = useSWR<IPerfil>(`/api${ url }`, config)

    return {
        Perfil: data,
        isLoading,
        isError: error
    }

} 