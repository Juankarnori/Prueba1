import { IPerfil } from '@/interface';
import { PerfilState } from './';

type PerfilActionType =
| { type: '[Perfil] - createdPerfil', payload: IPerfil }
| { type: '[Perfil] - notPerfil' }

export const perfilReducer = ( state: PerfilState, action: PerfilActionType ): PerfilState => {

    switch (action.type) {
        case '[Perfil] - createdPerfil':
            return {
                ...state,
                isExistPerfil: true,
                perfil: action.payload,
            }

        case '[Perfil] - notPerfil':
            return {
                ...state,
                isExistPerfil: false,
                perfil: undefined,
            }

        default:
            return state;
    }

}