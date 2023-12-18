import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {AppBar, Avatar, Box, CssBaseline, Divider, Drawer, IconButton, Grid} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


import imageUser from '../../assets/imagemUser.png'

const drawerWidth = 240;
const navItems = ['Reclamações', 'Departamentos'];

function DrawerAppBar(props) {
    const navigate = useNavigate()

    const handlePerfil = () => {
        navigate('/perfil')
    }

    const styleDiv = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        position: 'fixed',
        top: '0',
        left: '0',
        padding: '20px',
        width: '90%',
        height: '20px',
        background: '#FFF'
    }
    
    const styleImgUser = {
        borderRadius: '999px',
        border: 'none',
        height: '40px',
        width: '40px'
    }

    const styleH1 = {
        margin: '0px 0px',
        fontSize: '26px'
    }

    var styleMenuLateral = {
        width: '180px',
        height: '100vh',
        backgroundColor: '#FFF',
        top: '60px',
        padding: '15px',
        position: 'fixed',
        left: '-240px',
        transition: 'left 0.5s',
        opacity: '1',
        borderColorRight: '#000'
    }

    const styleMenuLateralActivited = {
        ...styleMenuLateral,
        left: '0px'
    }

    const StyleContainerMenuLateral = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '15px',
        marginBottom: '20px',
        borderBottom: '2px solid black'
    }

    const StyleContainerProfile = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }

    const styleH4 = {
        margin: '5px',
        marginLeft: '10px'
    }

    const styleSpanPerfil = {
        color: '#90A3BF',
        fontSize: '16px',
        fontWeight: '500'
    }

    const styleButton = {
        background: '#3563E9',
        borderRadius: '999px',
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: '16px',
        padding: '6px 10px',
        border: 'none',
    }

    const styleLinkMenuLateral = {
        color: '#3563E9',
        fontWeight: '400',
        fontSize: '16px',
        padding: '10px'
    }

    const styleDivLinks = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Grid container sx={{p: 3, alignItems: 'center'}}>
      <div style={StyleContainerMenuLateral} onClick={handlePerfil}>
                <div style={StyleContainerProfile}>
                    <img src={imageUser} style={styleImgUser}/>
                    <h4 style={styleH4}>João Victor Soares Oliveira</h4>
                </div>  
                <span style={styleSpanPerfil}>Ver perfil</span>
            </div>
      </Grid>
     
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" color="transparent">
        <Toolbar>
          <IconButton
            color="#596780"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, color: '#3563E9', fontSize: '26px', fontWeight: 'bold' }}
          >
            ComunidadeQueFala
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" >
        <Toolbar />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;