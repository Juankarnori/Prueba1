import { IUser } from "./user";

export interface IEsp32 {
    _id?    : string;
    chipId? : string;
    user?   : IUser | string;
    led     : number;
    status  : 'ON'|'OFF';

    createdAt?: string;
    updatedAt?: string;
}