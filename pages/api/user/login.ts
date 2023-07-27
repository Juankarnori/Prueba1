import { db } from '@/database'
import { User } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { jwt } from '@/utils';

type Data = 
| { message: string }
| {
    token: string;
    user: {
        email: string;
        user: string;
        role: string;
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'POST':
            return loginUser(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }

}

const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '' } = req.body;

    await db.connect();
    const usuario = await User.findOne({ email });
    await db.disconnect();

    if ( !usuario ) {
        return res.status(400).json({ message: 'Correo o contraseña no validos' })
    }
    
    if ( !bcrypt.compareSync( password, usuario.password! ) ) {
        return res.status(400).json({ message: 'Correo o contraseña no validos' })
    }

    const { role, user, _id } = usuario;

    const token = jwt.signToken( _id, email );

    return res.status(200).json({
        token,
        user: {
            email, role, user
        }
    })

}
