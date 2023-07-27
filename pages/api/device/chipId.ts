import { db } from '@/database'
import { IUser } from '@/interface'
import { Esp32, User } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| { 
    chipId: string,
    user: string,
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'GET':
            return getChipId( req, res )
    
        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }

}

const getChipId = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { chipId = '' } = req.query as { chipId: string };

    await db.connect();
    const device = await Esp32.findOne({ chipId });

    if ( !device ) {
        return res.status(400).json({ message: 'No esta registrado este dispositvo' })
    }

    const { user } = device;
    const usuario = await User.findOne({ _id: user });
    
    if ( !usuario ) {
        return res.status(400).json({ message: 'No esta autenticado' })
    }
    await db.disconnect();

    const { _id } = usuario;

    return res.status(200).json({ 
        chipId,
        user: _id
     })

}
