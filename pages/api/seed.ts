import { db, seedDatabase } from '@/database'
import { Esp32, Perfil, Pill, User } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if ( process.env.NODE_ENV === 'production' ){
        return res.status(401).json({ message: 'No tiene acceso a este API' })
    }

    await db.connect();

    await User.deleteMany();
    await User.insertMany( seedDatabase.initialData.users );

    await Pill.deleteMany();
    await Pill.insertMany( seedDatabase.initialData.pills );
    
    await db.disconnect();

    res.status(200).json({ message: 'Proceso realizaco correctamente' })
}