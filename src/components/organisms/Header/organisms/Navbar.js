import NextLink from "next/link";
import Image from "next/image";
import * as React from 'react';
import {
  Button,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText, AppBar, Toolbar, IconButton, Drawer, Link as MUILink, Grid
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";

import dynamic from 'next/dynamic'

const ComponentWithNoSSR = dynamic(
  () => import('@/components/organisms/Header/organisms/AuthBlock'),
  { ssr: false }
)

const navigation = [
  {id: 1, title: 'Главная', path: '/'},
  {id: 2, title: 'Контакты', path: '/about-us'},
  {id: 3, title: 'Клубы', path: '/gyms'},
];
const drawerWidth = 240;

function MenuButton() {
  return (<MenuIcon sx={{ color: '#000' }} />);
}

function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ДВОРЕЦ СПОРТА
      </Typography>
      <Divider />
      <List>
        {navigation.map(({id, title, path}) => (
          <ListItem key={id} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Button
                sx={{ color: '#000' }}
                component='a'
                href={path}
                LinkComponent={NextLink}
              >
                {title}
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex', paddingBottom: "10vh"}}>
      <CssBaseline />
      <AppBar component="nav" style={{ background: '#fff' }}>
        <Toolbar>
          <Grid container spacing={3}>
            <Grid container item
                  xs={4}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
            >
              <Grid item xs={1}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{display: { sm: 'none' } }}
                >
                  <MenuButton />
                </IconButton>
              </Grid>
              <Grid item xs >
                <NextLink
                  href="/" passHref legacyBehavior>
                  <MUILink sx={{padding:2}}>
                    <Image src="/logo.svg" width={70} height={70} alt="logo" />
                  </MUILink>
                </NextLink>
              </Grid>
            </Grid>

            <Grid container item xs={5}
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
            >
              {
                navigation.map(({id, title, path}) => {
                  return (
                    <Grid item xs key={id} sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    <Button
                      sx={{ color: '#000' }}

                      component='a'
                      href={path}
                      LinkComponent={NextLink}
                    >
                      {title}
                    </Button>
                    </Grid>
                  )
                })
              }
            </Grid>

            <Grid
              container
              item xs={3}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <ComponentWithNoSSR />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box component="nav">
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
      </Box>
    </Box>
  );
}

NavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavBar;
