import NextLink from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import {Button, Box, ButtonGroup, Paper} from '@mui/material';

const navigation = [
  {id: 1, title: 'Home', path: '/'},
  {id: 2, title: 'History', path: '/history'},
  {id: 3, title: 'Category', path: '/category'},
];

const Navbar = () => {
  const {pathname} = useRouter();

  return (
    <nav>
      <Paper>
        <Box
          sx={{
              minHeight: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
          }}
          padding={1.5}
        >
          <Image src="/logo.svg" width={70} height={70} alt="logo"
          />
          <Box>
              {navigation.map(({id, title, path}) => {
                return (
                  <Box
                    sx={{
                      minHeight: '100%',
                      display: 'inline-grid',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      maxWidth: '33%'
                    }}
                    key={id}
                    marginRight={30}
                  >
                    <Button
                      component='a'
                      href={path}
                      LinkComponent={NextLink}
                    >
                      {title}
                      {/*<Link*/}
                      {/*    active={pathname === path ? "true" : null}*/}
                      {/*    href={path}*/}
                      {/*>*/}
                      {/*    {title}*/}
                      {/*</Link>*/}
                    </Button>
                  </Box>

                )
              })}
          </Box>
        </Box>
      </Paper>
    </nav>
  );
};

export default Navbar;