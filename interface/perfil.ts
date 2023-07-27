import { IUser } from "./user";

export interface IPerfil {
    _id?        : string;
    user?       : IUser | string ;
    nombre      : string ;
    apellido    : string ;
    ciudad      : string ;
    celular     : string ;

    createdAt?  : string;
    updatedAt?  : string;
}