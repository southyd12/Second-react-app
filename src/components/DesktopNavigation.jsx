import React from 'react'
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

function DesktopNavigation({ handleDrawerToggle = () => console.log("no handleDrawerToggle function provided")}) {
  const theme = useTheme();
  const lightTextColor = theme.palette.common.white;
  return (
    <>
    <AppBar component="nav">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component={NavLink} to={`/`}
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textDecoration: 'none', color: lightTextColor }}
              >
                Cartoon App
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Button sx={{ color: lightTextColor }} component={NavLink} to="/add">
                    Add Cartoon
                  </Button>
              </Box>
            </Toolbar>
          </AppBar>
          </>
      )
    }

export default DesktopNavigation