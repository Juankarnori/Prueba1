import NextLink from 'next/link';

import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { UiContext } from '@/context';
import { useContext } from 'react';

export const Navbar = () => {

  const { asPath } = useRouter();
  const { toggleSideMenu } = useContext( UiContext )

  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref legacyBehavior>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>ESP32 |</Typography>
                    <Typography sx={{ ml: 0.5 }}>WEBSERVER</Typography>
                </Link>
            </NextLink>

            <Box flex={ 1 } />

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <NextLink href='/category/device' passHref legacyBehavior>
                <Link>
                  <Button color={ asPath === '/category/device' ? 'primary':'info' }>Dispositivos</Button>
                </Link>
              </NextLink>
              <NextLink href='/category/pill' passHref legacyBehavior>
                <Link>
                  <Button color={ asPath === '/category/pill' ? 'primary':'info' }>Medicamentos</Button>
                </Link>
              </NextLink>
            </Box>

            <Box flex={ 1 } />

            <IconButton>
              <SearchOutlined />
            </IconButton>

            <NextLink href='/cart' passHref legacyBehavior>
              <Link>
                <IconButton>
                  <Badge badgeContent={ 2 } color='secondary'>
                    <ShoppingCartOutlined />  
                  </Badge>
                </IconButton>
              </Link>
            </NextLink>

            <Button onClick={ toggleSideMenu }>
              Menu
            </Button>

        </Toolbar>
    </AppBar>
  )
}
