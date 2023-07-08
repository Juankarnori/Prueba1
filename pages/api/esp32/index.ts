import { db } from '@/database'
import { IEsp32 } from '@/interface'
import { Esp32 } from '@/models'
import { SportsEsportsRounded } from '@mui/icons-material'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| IEsp32[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getStatus( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

    res.status(200).json({ message: 'Example' })
}

const getStatus = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { user = 'all' } = req.query;

    let condition = {};

    if ( user !== 'all' ) {
        condition = { user };
    }

    await db.connect();
    const status = await Esp32.find(condition).select('status -_id').lean();

    await db.disconnect();

    return res.status(200).json( status )

}