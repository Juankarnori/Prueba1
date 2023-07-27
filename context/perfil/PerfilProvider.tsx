import { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { PerfilContext, perfilReducer } from './';
import { IPerfil } from '@/interface';
import { esp32Api } from '@/api';
import { AuthContext } from '../auth';
import axios from 'axios';

export interface PerfilState {
    perfil?: IPerfil;
    isExistPerfil: boolean;
}

const Perfil_INITIAL_STATE: PerfilState = {
    perfil: undefined,
    isExistPerfil: false,
}

export const PerfilProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(perfilReducer, Perfil_INITIAL_STATE);
    const { user } = useContext( AuthContext );
    useEffect(() => {
        checkPerfil();
    },[user])

    const checkPerfil = async() => {

        const usuario = user?.user

        try {
            const { data } = await esp32Api.get(`/user/perfil?user=${usuario}`)
            const { existPerfil, perfil } = data;
            if( existPerfil ) {
                dispatch({ type: '[Perfil] - createdPerfil', payload: perfil })
            } else {
                dispatch({ type: '[Perfil] - notPerfil' })
            }
        } catch (error) {
            console.log(error);
        }

    }

    const createPerfil = async( perfil: IPerfil ): Promise<{hasError: boolean; message?: string}> => {

        const body: IPerfil = {
            ...perfil,
            user,
        }
        
        try {
            
            const { data } = await esp32Api.post('/user/perfil', body)
            dispatch({ type: '[Perfil] - createdPerfil', payload: data });
            return {
                hasError: false
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear perfil'
            }
        }

    }

    return (
        <PerfilContext.Provider value={{
            ...state,

            createPerfil,
            checkPerfil,
        }}>
            { children }
        </PerfilContext.Provider>
    )
};