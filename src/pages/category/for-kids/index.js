import Heading from '/src/components/Heading';
import { Box } from '@mui/material';

const ForKids = () => (
    <Box
        xs={{
            minHeight: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Heading text='ForKids' />
    </Box>
);
export default ForKids;