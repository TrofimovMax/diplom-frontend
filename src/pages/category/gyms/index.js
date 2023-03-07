import Heading from '/src/components/Heading';
import {Box, Container, Paper, styled, Table, TableBody, TableContainer, TableHead, TableRow} from '@mui/material';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import FormCell from "@/components/FormCell";

import Schedule from "/src/api/schedule.json"

const objSchedule = Schedule;
const rows = Object.keys(objSchedule.Schedule);
const re = /:\d\d/;

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Gyms = () => {
  const tableArr = Object.entries(objSchedule.Schedule);

  // for (let key in objSchedule.Schedule) {
  //   objSchedule.Schedule[key].map((itemKey) => {
  //     let arr = Object.entries(itemKey).map(item => {
  //       console.log(`key=${item[0].split(re)} value=${item[1]}`)
  //     });
  //   })
  // }

  return (
    <Container>
      <Box
        xs={{
          minHeight: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box><Heading text='Gyms'/></Box>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 700}} aria-label="customized table">
            <TableBody>
              {
                tableArr.map((dayArr) => {
                  return(
                    <StyledTableRow key={dayArr[0]}>
                      <StyledTableCell >{dayArr[0]}</StyledTableCell>
                      {
                        dayArr[1].map(dayObj => {
                            return(
                              <StyledTableCell key={Object.keys(dayObj)} component="th" scope="row">
                                <FormCell
                                  start = {Object.keys(dayObj)}
                                  end = {Object.values(dayObj)}
                                  maxCapacity = {20}
                                  currentCapacity = {0}
                                />
                              </StyledTableCell>
                            )
                        })
                      }
                    </StyledTableRow>
                      )
                    }
                  )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

  export default Gyms;