import { MainLayout } from '@/components/layouts'
import { Typography } from '@mui/material'
import React from 'react'

const PageDevice = () => {
  return (
    <MainLayout title={'Pagina de Dispositivos'} pageDescription={'Pagina de Dispositivos'}>
        <Typography variant='h1' component='h1'>Dispositivos</Typography>
    </MainLayout>
  )
}

export default PageDevice