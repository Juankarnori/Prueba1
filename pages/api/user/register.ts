import { db } from '@/database'
import { User } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { jwt, validations } from '@/utils';

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
            return registerUser(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }

}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '', user = '' } = req.body as { email: string, password: string, user: string };

    await db.connect();
    const usuario = await User.findOne({ email });

    if ( password.length < 6 ) {
        return res.status(400).json({
            message: 'La contraseña debe de ser de 6 caracteres'
        });
    }

    if ( user.length < 2 ) {
        return res.status(400).json({
            message: 'El nombre debe de ser de 2 caracteres'
        });
    }

    if ( !validations.isValidEmail( email ) ) {
        return res.status(400).json({
            message: 'El correo no tiene formato de correo'
        });
    }

    if ( usuario ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Ese correo ya esta registrado' })
    }
    
    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync( password ),
        role: 'client',
        user,
    });

    try {
        await newUser.save({ validateBeforeSave: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
    }

    const { _id, role } = newUser;

    const token = jwt.signToken( _id, email );

    return res.status(200).json({
        token,
        user: {
            email,
            role, 
            user
        }
    })

}
