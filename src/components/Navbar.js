import NextLink from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import * as React from 'react';
import {
  Button,
  Box,
  ButtonGroup,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText, AppBar, Toolbar, IconButton, Drawer
} from '@mui/material';
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";

const navigation = [
  {id: 1, title: 'Home', path: '/'},
  {id: 2, title: 'History', path: '/history'},
  {id: 3, title: 'Gyms', path: '/gyms'},
];
const drawerWidth = 240;

function MenuIcon() {
  return null;
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
        MUI
      </Typography>
      <Divider />
      <List>
        {navigation.map(({id, title, path}) => (
          <ListItem key={id} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', paddingBottom: 9}}>
      <CssBaseline />
      <AppBar component="nav" style={{ background: '#fff' }}>
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
          <Image src="/logo.svg" width={70} height={70} alt="logo" />
          <Typography
            variant="h6"
            component="div"
            sx={{ color: '#000', flexGrow: 1, marginLeft: 3, display: { xs: 'none', sm: 'block' } }}
          >
            Sport Palace
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {
              navigation.map(({id, title, path}) => {
              return (
                <Button
                  sx={{ color: '#000' }}
                  key={id}
                  component='a'
                  href={path}
                  LinkComponent={NextLink}
                >
                  {title}
                </Button>
              )
            })
            }
          </Box>
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
