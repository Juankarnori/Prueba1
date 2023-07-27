
export interface IUser {
    _id?     : string;
    user     : string;
    email    : string;
    password?: string;
    role     : string;

    createdAt?: string;
    updatedAt?: string;
}