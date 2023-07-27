import { IUser } from '@/interface';
import { createContext } from 'react';

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;
    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (user: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string | undefined; }>;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);