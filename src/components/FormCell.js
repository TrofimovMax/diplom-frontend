import {Paper, Box, Typography, Button} from "@mui/material";

const FormCell = ({start,end,maxCapacity, currentCapacity}) => (
  <Paper>
    <Box>
      <Typography>Class starting:{start}</Typography>
      <Typography>Class ending:{end}</Typography>
      <Typography>Number of places: {currentCapacity} of {maxCapacity}</Typography>
    </Box>
    <Box>
      {
        currentCapacity < maxCapacity ?
          <Button>
            Book
          </Button> : null
      }
    </Box>
  </Paper>
);
export default FormCell;