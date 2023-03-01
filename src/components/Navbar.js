import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Box, ButtonGroup } from '@mui/material';

const navigation = [
    { id: 1, title: 'Home', path: '/' },
    { id: 2, title: 'History', path: '/history' },
    { id: 3, title: 'Category', path: '/category' },
];

const Navbar = () => {
    const { pathname } = useRouter();

    return (
        <nav>
            <Box>
                <Image src="/logo.svg" width={70} height={70} alt="logo" />
            </Box>

            <ButtonGroup variant="contained" aria-label="outlined button group">
                {navigation.map(({ id, title, path }) => {
                    return(
                        <Button
                            key={id}
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
                    )})}
            </ButtonGroup>
        </nav>
    );
};

export default Navbar;