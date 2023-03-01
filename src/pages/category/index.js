import Heading from '/src/components/Heading';
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Typography } from '@mui/material';

const categories = [
    { id: 1, title: 'ForKids', path: '/category/for-kids' },
    { id: 2, title: 'Gyms', path: '/category/gyms' },
    { id: 3, title: 'SwimmingPool', path: '/category/swimming-pools' },
];

const Category = () => {
    const { pathname } = useRouter();

    return (
        <Box sx={{
            minHeight: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Heading text='Category'/>
            <Box className="filter">
                {categories.map(({id, title, path}) => {
                    return (
                        <Button
                            component='a'
                            LinkComponent={NextLink}
                            active={pathname === path ? "true" : null}
                            key={id}
                            href={path}
                        >
                            {title}
                        </Button>
                    )
                })}
            </Box>
            <Typography variant='subtitle2'>This place of description sports sections in sport palace.</Typography>
        </Box>
    );
}
export default Category;