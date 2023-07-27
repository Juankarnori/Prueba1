import { db } from '@/database'
import { IPill } from '@/interface'
import Pill from '@/models/Pill'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| IPill[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getProducts( req, res )
        
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();
    const pills = await Pill.find().lean();

    await db.disconnect();

    return res.status(200).json( pills )

}
