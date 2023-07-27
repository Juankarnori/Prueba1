import { IPerfil } from '@/interface';
import { createContext } from 'react';

interface ContextProps {
    isExistPerfil: boolean;
    perfil?: IPerfil;
    createPerfil: (perfil: IPerfil) => Promise<{ hasError: boolean; message?: string | undefined; }>;
    checkPerfil: (usuario: string) => Promise<void>;
}

export const PerfilContext = createContext({} as ContextProps);