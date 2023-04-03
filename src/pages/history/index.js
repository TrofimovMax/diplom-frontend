import Heading from '/src/components/atoms/Heading';
import { Box } from '@mui/material';

const History = () => (
    <Box
        xs={{
            minHeight: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Heading text='History' />
    </Box>

);
export default History;