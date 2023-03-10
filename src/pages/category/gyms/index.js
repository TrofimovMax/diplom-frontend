import Heading from '/src/components/Heading';
import {Box, Container, Paper, styled, Table, TableBody, TableContainer, TableHead, TableRow} from '@mui/material';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';

import Schedule from "/src/api/schedule.json"
import FormCell from "@/components/FormCell";

const END_DAY = 24;
const times = [...Array(END_DAY).keys()].map(x => ++x);
const objSchedule = Schedule;
const re = /:\d\d/;


const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    minWidth: 70,
    minHeight: 70,
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

const timeInit = (arr, time) => {
  /*
  arr = [
    DayWeek,
    [[Object], [Object], [Object], [Object] ]
  ]
  */
  let result = -1;
  arr[1].map(daySchedule => {
    const timesSchedule = Object.keys(daySchedule);
    const numTimeSchedule = Number(timesSchedule[0].split(re,1)[0])
    numTimeSchedule === time? result = numTimeSchedule: null;
  })
  return result;
  //i done it, but i can't explane how it works
}

const Gyms = () => {
  const tableArr = Object.entries(objSchedule.Schedule);

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
          <Table sx={{minWidth: 1200}} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  location gym
                </StyledTableCell>
                {
                  times.map(time => {
                    return(
                      <StyledTableCell key={time}>
                        {time-1}:00 - {time}:00
                      </StyledTableCell>
                    )
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                tableArr.map((dayArr) => {
                  return(
                    <StyledTableRow key={dayArr[0]}>
                      <StyledTableCell sx={{ border: 1 }}>{dayArr[0]}</StyledTableCell>
                      {
                        times.map(time => {
                          {
                            if (timeInit(dayArr, time) === time) {
                              return (
                                <StyledTableCell sx={{ border: 1, width:70, height:70 }} key={time} component="th" scope="row">
                                  <FormCell/>
                                </StyledTableCell>
                              )
                            }
                            else {
                              return (
                                <StyledTableCell sx={{ border: 1}} key={time} component="th" scope="row">
                                </StyledTableCell>
                              )
                            }
                          }
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