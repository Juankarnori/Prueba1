import { MainLayout } from '@/components/layouts'
import { PillList } from '@/components/pill'
import { initialData } from '@/database/seed-data'
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'

const PagePill = () => {
  return (
    <MainLayout title={'Pagina de Medicamentos'} pageDescription={'Pagina de Medicamentos'}>
        <Typography variant='h1' component='h1'>Medicamentos</Typography>

        <PillList 
          pills={ initialData.pills }          
        />

    </MainLayout>
  )
}

export default PagePill