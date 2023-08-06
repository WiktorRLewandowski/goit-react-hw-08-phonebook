import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Loader } from 'components/Loader';
import { UserMenu } from 'components/UserMenu';
import { Container } from '@mui/material';

export default function ButtonAppBar() {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Container maxWidth='lg'>
        <Toolbar>          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Phonebook
          </Typography>
          <UserMenu/>
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
    <Suspense fallback={<Loader/>}>
        <Outlet/>
    </Suspense>
    </>
  );
}