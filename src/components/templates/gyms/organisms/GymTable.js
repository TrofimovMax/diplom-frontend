import {Box, Paper, styled, Table, TableBody, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import FormCell from "@/components/templates/gyms/molecules/FormCell";
import React from "react";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import moment from 'moment';
import keys from 'lodash/keys';


const END_DAY = 24;
const times = [...Array(END_DAY).keys()].map(x => ++x);

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

const timeInit = (dayDate, time, schedule) => {
  /*
  dayDate = 'Mon 10/04' ...
  day = 'mon'
  time = start_at
  schedule = {
    fri: { 12:00: '20:00' },
    mon: { 09:00: '17:00' },
    sat: { 11:00: '18:00' },
    thu: { 18:00: '23:00' },
    tue: { 10:00: '16:00' },
    wed: { 09:00: '17:00' }
  }
  */
  const day = dayDate.substring(0,3).toLowerCase(); // change this str 'Mon 10/04' to 'mon'
  const start = keys(schedule[day])[0]; // key - fri
  const obj = schedule[day]; //object day by key - { 12:00: '20:00' }
  const end = obj[start]; // value of key
  if(time >= Number(start.split(/:\d\d/)[0]) && time < Number(end.split(/:\d\d/)[0])){
    return true
  }
  return false
}

const createWeekSchedule = () => {
  let curr = new Date;
  let week = [];

  for (let i = 1; i <= 6; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    week.push(day);
  }

  return week;
}

const GymTable = ({address, raw}) => {
  if (!raw) return (<Typography variant='h1'>Error</Typography>)

  // weekDateDay is array => ['Mon 10/04', 'Tue 11/04', 'Wed 12/04', 'Thu 13/04', 'Fri 14/04', 'Sat 15/04']
  const weekDateDay = createWeekSchedule().map( i => moment(i).format('ddd DD/MM'))

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 1200}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              {address}
            </StyledTableCell>
            {
              times.map(time => {
                return (
                  <StyledTableCell key={time}>
                    {time - 1}:00 - {time}:00
                  </StyledTableCell>
                )
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          { weekDateDay.map(day => (
            <StyledTableRow key={day}>
              <StyledTableCell sx={{border: 1}}>{day}</StyledTableCell>
              {
                times.map(time => {
                  if(timeInit(day, time-1, raw)){
                    return (
                      <StyledTableCell sx={{border: 1, padding: 0, width: 70, height: 70}} key={time}
                                       component="th" scope="row">
                        <FormCell date={day.substring(4)} time={time} gymId={3}/>
                      </StyledTableCell>
                    )
                  } else {
                    return (
                      <StyledTableCell sx={{border: 1, height: 1, width: 1,}} key={time} component="th"
                                       scope="row">
                        <Box/>
                      </StyledTableCell>
                    )
                  }
                })
              }
            </StyledTableRow>
          ))}
          <TableRow>
            <StyledTableCell>
            </StyledTableCell>
            {
              times.map(time => {
                return (
                  <StyledTableCell key={time} component="th"
                                   scope="row">
                    <Box/>
                  </StyledTableCell>
                )
              })
            }
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default GymTable;