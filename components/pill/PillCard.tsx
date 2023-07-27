import { FC } from "react";
import NextLink from 'next/link';
import { IPill } from "@/interface"
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"

interface Props {
    pill: IPill;
}

export const PillCard: FC<Props> = ({ pill }) => {



  return (
    <Grid item xs={6} sm={4}>
        <Card>
          <NextLink href='/pill/slug' passHref legacyBehavior prefetch={ false }>
            <Link>
              <CardActionArea>
                  <CardMedia 
                    component='img'
                    image={ `/pills/${ pill.image }` }
                    alt={ pill.nombre }
                  />
              </CardActionArea>
            </Link>
          </NextLink>
        </Card>

        <Box sx={{ mt: 1 }} className='fadeIn'>
            <Typography>{ pill.nombre }</Typography>
        </Box>
    </Grid>
  )
}
