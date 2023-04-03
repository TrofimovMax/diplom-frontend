import {Box, Paper, styled, Table, TableBody, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import FormCell from "@/components/templates/gyms/molecules/FormCell";
import React from "react";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";

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

const timeInit = (obj, time) => {
  /*
  obj = {
    fri: { 12:00: '20:00' },
    mon: { 09:00: '17:00' },
    sat: { 11:00: '18:00' },
    thu: { 18:00: '23:00' },
    tue: { 10:00: '16:00' },
    wed: { 09:00: '17:00' }
  }
  */
  const re = /:\d\d/;
  const findTime = time + ":00";
  const arrInterval = Object.entries(obj[1]) //[Array(2)]0:(2) ['12:00', '20:00']length:1[[Prototype]]:Array(0)
  let startInterval = Number(arrInterval[0][0].split(re, 1)[0]);
  let endInterval = Number(arrInterval[0][1].split(re, 1)[0]);
  let popped = []
  for (startInterval ; startInterval < endInterval; startInterval++) {
    popped.push(startInterval + ":00");// добавляет в массив интервалов только начало занятий
  }
  return popped.includes(findTime) ? true : null;
}


const GymTable = ({address, raw}) => {
  if (!raw) return (<Typography variant='h1'>Error</Typography>)
  const tableArr = Object.entries(raw);
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
          {
            tableArr.map((dayArr) => {
                return (
                  <StyledTableRow key={dayArr[0]}>
                    <StyledTableCell sx={{border: 1}}>{dayArr[0]}</StyledTableCell>
                    {
                      times.map(time => {
                        {
                          if (timeInit(dayArr, time - 1)) {
                            return (
                              <StyledTableCell sx={{border: 1, padding: 0, width: 70, height: 70}} key={time}
                                               component="th" scope="row">
                                <FormCell time={time} gymId={3}/>
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
  );
}
export default GymTable;