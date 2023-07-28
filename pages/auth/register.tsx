import NextLink from "next/link";
import { AuthLayout } from '@/components/layouts'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { validations } from "@/utils";
import { ErrorOutline } from "@mui/icons-material";
import { useRouter } from "next/router";
import { AuthContext } from "@/context";
// import { getSession, signIn } from 'next-auth/react';
// import { GetServerSideProps } from "next";

type FormData = {
    user: string;
    email: string;
    password: string;
}

const RegisterPage = () => {

    const router = useRouter();
    const { registerUser } = useContext( AuthContext );
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onRegisterForm = async( { user, email, password }: FormData ) => {

        setShowError(false);
        const { hasError, message } = await registerUser( user, email, password );

        if ( hasError ) {
            setShowError(true);
            setErrorMessage( message! );
            setTimeout(() => { setShowError(false) }, 3000);
            return;
        }

        const destination = router.query.p?.toString() || '/';
        router.replace(destination);
        // await signIn('credentials',{ email, password })

    }

  return (
    <AuthLayout title={'Registrar'}>
        <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
            <Box sx={{ width: 350, padding: '10px 20px' }} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Crear Usuario</Typography>
                        {/* <Chip 
                            label='No se puede utilizar ese correo'
                            color="error"
                            icon={ <ErrorOutline /> }
                            className="fadeIn"
                            sx={{ display: showError ? 'flex' : 'none' }}
                        /> */}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                            label="Usuario" 
                            variant='filled' 
                            fullWidth
                            { ...register('user', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Minimo 2 caracteres'}
                            })}
                            error={ !!errors.user }
                            helperText={ errors.user?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Correo" 
                            type="email"
                            variant='filled' 
                            fullWidth
                            { ...register('email', {
                                required: 'Este campo es requerido',
                                validate: validations.isEmail
                            })}
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Contraseña" 
                            type='password' 
                            variant='filled' 
                            fullWidth
                            { ...register('password', {
                                required: 'Este campo es requerido',
                                minLength: { value: 6, message: 'Minimo 6 caracteres' }
                            })}
                            error={ !!errors.password }
                            helperText={ errors.password?.message }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button 
                            type="submit"
                            color='secondary' 
                            className='circular-btn' 
                            size='large' 
                            fullWidth
                        >
                            Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink 
                            href={ router.query.p ? `/auth/login?p=${ router.query.p }` : '/auth/login'} 
                            passHref 
                            legacyBehavior
                        >
                            <Link underline="always">
                                ¿Ya tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


// export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
//     const session = await getSession({ req });

//     const { p = '/' } = query;

//     if ( session ) {
//         return {
//             redirect: {
//                 destination: p.toString(),
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: { }
//     }
// }

export default RegisterPage