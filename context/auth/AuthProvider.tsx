import { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { useSession, signOut } from "next-auth/react";
import { IUser } from '@/interface';
import { esp32Api } from '@/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PerfilContext } from '../perfil';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const router = useRouter();
    const { checkPerfil } = useContext( PerfilContext );

    const { data, status } = useSession();

    useEffect(() => {
      if ( status === 'authenticated' ) {
        dispatch({ type: '[Auth] - Login', payload: data.user as IUser })
      }
    }, [status, data])
    

    // useEffect(() => {
    //     checkToken();
    // }, [])
    
    const checkToken = async() => {

        if ( !Cookies.get('token') ) {
            return;
        }

        try {
            const { data } = await esp32Api.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            Cookies.remove('token');
        }
    }

    const loginUser = async( email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await esp32Api.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;

        } catch (error) {
            return false;
        }
    }

    const registerUser = async( user: string, email: string, password: string): Promise<{hasError: boolean; message?: string}> => {

        try {
            const { data } = await esp32Api.post('/user/register', { user, email, password });
            const { token, usuario } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: usuario });
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
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    const logout = () => {
        // Cookies.remove('token');
        // router.reload();
        signOut();
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            loginUser,
            registerUser,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
};