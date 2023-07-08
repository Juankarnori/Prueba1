import { MainLayout } from '@/components/layouts'
import { Typography } from '@mui/material'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <MainLayout title={'ESP32-SERVER'} pageDescription={'Pagina de servidor esp32'}>
      <Typography variant='h1' component='h1'>ESP32</Typography>
      <Typography variant='h2' sx={{ mb: 1 }} >WEBSERVER</Typography>
    </MainLayout>
  )
}
