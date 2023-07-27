import { db } from '@/database'
import { IEsp32 } from '@/interface'
import { Esp32 } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| IEsp32

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'POST':
            return registerDevice( req, res)
    
        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }

}

const registerDevice = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { chipId = '', user = '', led = '', status = 'OFF' } = req.body;

    await db.connect();
    const device = await Esp32.findOne({ chipId });

    if ( device ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Ya esta registrado este dispositivo' })
    }

    const newDevice = new Esp32({
        chipId,
        user,
        led,
        status: 'ON'
    });

    try {
        await newDevice.save({ validateBeforeSave: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
    }

    const { _id } = newDevice;
    
    return res.status(200).json({ 
        _id,
        chipId,
        user,
        led,
        status
     })

}
