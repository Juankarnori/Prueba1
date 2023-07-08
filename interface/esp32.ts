export interface IEsp32 {
    _id: string;
    user: string;
    led: number;
    status: 'ON'|'OFF';

    createdAt: string;
    updatedAt: string;
}