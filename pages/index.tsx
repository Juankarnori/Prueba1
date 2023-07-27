import { MainLayout } from '@/components/layouts'
import { PerfilContext } from '@/context'
import { useEsp32 } from '@/hooks'
import { Typography } from '@mui/material'
import { Inter } from 'next/font/google'
import { useContext } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { isExistPerfil, perfil } = useContext(PerfilContext);

  return (
    <MainLayout title={'ESP32-SERVER'} pageDescription={'Pagina de servidor esp32'}>
      <Typography variant='h1' component='h1'>ESP32</Typography>
      <Typography variant='h2' sx={{ mb: 1 }} >WEBSERVER</Typography>
      {
        isExistPerfil && (
          <>
            <Typography variant='h1' component='h1' sx={{ mt: 4 }}>Bienvenido</Typography>
            <Typography variant='h2' fontSize={40} fontWeight={100}> {perfil?.nombre} {perfil?.apellido} </Typography>
          </>
        )
      }
    </MainLayout>
  )
}
