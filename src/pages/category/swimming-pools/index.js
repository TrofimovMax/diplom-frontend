import Heading from '/src/components/Heading';
import { Box } from '@mui/material';

const SwimmingPools = () => (
    <Box
        xs={{
            minHeight: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Heading text='SwimmingPools' />
    </Box>
);
export default SwimmingPools;