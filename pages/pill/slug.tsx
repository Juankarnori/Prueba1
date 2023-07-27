import { MainLayout } from "@/components/layouts"
import { initialData } from "@/database/seed-data"
import { Box, Button, Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"

const pill = initialData.pills[0];

const PillPage = () => {

  const url = `/pills/${ pill.image }`;

  return (
    <MainLayout title={ pill.nombre } pageDescription={pill.description}>
        <Grid container spacing={3}>
          
          <Grid item xs={12} sm={7}>
            <Card>
              <CardActionArea>
                <CardMedia
                  sx={{ padding: '10px 10px' }}
                  component='img'
                  image={ `/pills/${ pill.image }` }
                  alt={ pill.nombre }
                />
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={5}>
            <Box display='flex' flexDirection='column'>

              {/* titulos */}
              <Typography variant="h1" component='h1'> { pill.nombre } </Typography>

              {/* Cantidad */}
              <Box sx={{ my: 2 }}>
                <Typography variant="subtitle2">Dosis</Typography>
                {/* Item Counter */}
              </Box>

              {/* Agregar Boton */}
              <Button color="secondary" className="circular-btn">
                Agregar
              </Button>

              {/* Descripcion */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1">Descripcion</Typography>
                <Typography variant="subtitle2">{ pill.description }</Typography>
              </Box>

            </Box>
          </Grid>

        </Grid>
    </MainLayout>
  )
}

export default PillPage