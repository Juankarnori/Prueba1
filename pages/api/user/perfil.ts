import { AuthContext, PerfilContext } from '@/context';
import { db } from '@/database';
import { IPerfil, IUser } from '@/interface';
import { Perfil, User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { useContext } from 'react';

type Data = 
| { message: string }
| {
    existPerfil?: boolean;
    perfil?: IPerfil;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch ( req.method ) {
        case 'POST':
            return createPerfil(req, res);
        
        case 'GET':
            return obtenerPerfil(req, res);
                
        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }

}

const createPerfil = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { user, nombre = '', apellido = '', ciudad = '', celular = '' } = req.body as { user: IUser, nombre: string, apellido: string, ciudad: string, celular: string }

    if ( !user ) {
        return res.status(401).json({message: 'Debe estar autenticado para hacer esto'});
    }

    await db.connect();
    const perfil = await Perfil.findOne({ user })

    if ( nombre.length < 2 ) {
        return res.status(400).json({
            message: 'El nombre debe de ser minimo de 2 caracteres'
        });
    }

    if ( apellido.length < 2 ) {
        return res.status(400).json({
            message: 'El apellido debe de ser minimo de 2 caracteres'
        });
    }

    if ( perfil ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Este usuario ya tiene un perfil' })
    }

    const newPerfil = new Perfil({
        user,
        nombre,
        apellido,
        ciudad,
        celular,
    });

    try {
        await newPerfil.save({ validateBeforeSave: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
    }

    return res.status(201).json({
        existPerfil: true,
        perfil: newPerfil
    })

}
const obtenerPerfil = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { user = '' } = req.query;

    // return res.status(200).json({ message: `El usuario es: ${ user }`})
    
    await db.connect();
    const usuario = await User.findOne({ user }).lean();
    const userId = usuario?._id

    if ( !usuario ) {
        return res.status(200).json({message: 'No esta autenticado'})
    }

    try {
        const perfil = await Perfil.findOne({ user: userId }).select('user nombre apellido ciudad celular -_id').lean();
        // const { user, nombre, apellido, ciudad, celular  } = perfil;

        return res.status(200).json({
            existPerfil: true,
            perfil: {
                user: usuario,
                nombre: perfil!.nombre,
                apellido: perfil!.apellido,
                ciudad: perfil!.ciudad,
                celular: perfil!.celular,
            }
        })
    } catch (error) {
        console.log(error);
        await db.disconnect();
        console.log('No hay perfil')
        return res.status(200).json({
            existPerfil: false,
            perfil: undefined,
        })
    }
    
}

