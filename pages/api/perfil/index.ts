import { db } from '@/database'
import { IPerfil } from '@/interface'
import { Perfil, User } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| IPerfil

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'GET':
            return getPerfilById( req, res )

        default:
            res.status(400).json({
                message: 'Bad request'
            })

    }

}

const getPerfilById = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { user = '' } = req.query;

    await db.connect();
    const usuario = await User.findOne({ user });
    if ( !usuario ) {
        await db.disconnect();
        return res.status(401).json({ message: 'No esta autenticado' });
    }

    const perfil = await Perfil.findOne({ user: usuario });
    if ( !perfil ) {
        return res.status(400).json({ message: 'No existe un perfil con este usuario' })
    }

    const { nombre, apellido, ciudad, celular } = perfil;
    
    return res.status(200).json({ 
        nombre,
        apellido,
        ciudad,
        celular
     });

}
