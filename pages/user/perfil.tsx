import React, { useContext, useEffect, useState } from 'react'
import { MainLayout } from '@/components/layouts'
import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { ciudades } from '@/utils'
import { AuthContext, PerfilContext } from '@/context'
import { IPerfil } from '@/interface'
import { useForm } from 'react-hook-form'
import { CheckCircleOutlineOutlined, ErrorOutline } from '@mui/icons-material'

const PerfilPage = () => {

    const { createPerfil, isExistPerfil, perfil } = useContext( PerfilContext );
    const { user } = useContext(AuthContext)
    const [pnombre, setPnombre] = useState('');
    const [papellido, setPapellido] = useState('');
    const [pciudad, setPciudad] = useState(ciudades[0].name);
    const [pcelular, setPcelular] = useState('');
    useEffect(() => {
        if( isExistPerfil ) {
            setPnombre(`${perfil?.nombre}`);
            setPapellido(`${perfil?.apellido}`);
            setPcelular(`${perfil?.celular}`);
            setPciudad(`${perfil?.ciudad}`)
        }
    }, [])
    
    const { register, handleSubmit, formState: { errors } } = useForm<IPerfil>({
        defaultValues: {
            nombre: pnombre,
            apellido: papellido,
            ciudad: pciudad,
            celular: pcelular,
        }
    });
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const savePerfil = async( data: IPerfil ) => {

        const body: IPerfil = {
            ...data,
            user
        }

        setShowError(false);
        const { hasError, message } = await createPerfil( data );

        if ( hasError ) {
            setShowError(true);
            setErrorMessage( message! );
            setTimeout(() => { setShowError(false) }, 3000);
            return;
        }
    }

    const uploadPerfil = async() => {
        console.log('Actualizar')
    }

  return (
    <MainLayout title={'Pagina de Perfil'} pageDescription={'Pagina de Perfil'}>
        <form onSubmit={ handleSubmit( isExistPerfil ? uploadPerfil : savePerfil ) } noValidate>

            <Typography variant='h1' component='h1'>Perfil</Typography>

            <Chip 
                label='Este usuario ya tiene un perfil'
                color="error"
                icon={ <ErrorOutline /> }
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
            />

            <Grid container spacing={ 2 } sx={{ mt: 2 }}>
                <Grid item xs={ 12 } sm={ 6 }>
                    <TextField 
                        label='Nombre' 
                        variant='filled' 
                        fullWidth 
                        { ...register('nombre', {
                            required: 'Este campo es requerido',
                        })}
                        error={ !!errors.nombre }
                        helperText={ errors.nombre?.message }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                    <TextField 
                        label='Apellido' 
                        variant='filled' 
                        fullWidth 
                        { ...register('apellido', {
                            required: 'Este campo es requerido',
                        })}
                        error={ !!errors.apellido }
                        helperText={ errors.apellido?.message }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                    <FormControl fullWidth>
                        <TextField
                            select
                            variant='filled'
                            label="Ciudad"
                            defaultValue={ ciudades[0].name }
                            { ...register('ciudad', {
                                required: 'Este campo es requerido',
                            })}
                            error={ !!errors.ciudad }
                            // helperText={ errors.ciudad?.message }
                        >
                            {
                                ciudades.map( ciudad => (
                                    <MenuItem
                                        key={ ciudad.name }
                                        value={ ciudad.name }
                                    >
                                        { ciudad.name }
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                    <TextField 
                        label='Celular' 
                        variant='filled' 
                        fullWidth 
                        { ...register('celular', {
                            required: 'Este campo es requerido',
                        })}
                        error={ !!errors.celular }
                        helperText={ errors.celular?.message }
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                <Button type='submit' color='secondary' className='circular-btn' size='large'>
                    { isExistPerfil ? 'Actualizar' : 'Guardar' }
                </Button>
            </Box>

        </form>

    </MainLayout>
  )
}

export default PerfilPage