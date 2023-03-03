import Heading from '/src/components/Heading';
import {Box} from '@mui/material';

const Gyms = () => (
  <Box
    xs={{
      minHeight: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Heading text='Gyms'/>
  </Box>
);
export default Gyms;