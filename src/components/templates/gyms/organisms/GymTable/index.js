import {
  Box,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import BookingForm from "@/components/templates/gyms/organisms/BookingForm";
import React from "react";
import moment from 'moment';
import filter from 'lodash/filter';
import { timeInit, createWeekSchedule } from './utils';
import { StyledTableCell, StyledTableRow } from './styles';
import { hours } from './constants';
import { useQuery } from "react-query";
import { getByQueryKey } from "@/api/getByQueryKey";

const GymTable = ({address, gymId, raw, capacity, handleClick, setResponseMessage, setSeverity}) => {
  const { isLoading, isError, data, refetch } = useQuery(["gyms", gymId, "bookings" ], getByQueryKey);

  const bookings = data?.data || []

  const preparedBookings = bookings.map((item) => {
    return {
      ...item,
      start: moment(item.start_at).format('ddd DD/MM h')
    }
  })

  const getBookingsCountByTime = (bookingWeeks, day, hour) => {
    const start = `${day} ${hour}`
    const bookingsByTime = filter(preparedBookings, { start })
    return bookingsByTime.length
  }

  if (isLoading) return (<LinearProgress />)
  if (!raw || isError) return (<Typography variant='h1'>Error</Typography>)
  const days = createWeekSchedule().map( i => moment(i).format('ddd DD/MM'))

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 1200}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              {address}
            </StyledTableCell>
            {
              hours.map(hour => {
                return (
                  <StyledTableCell key={hour}>
                    {hour - 1}:00 {hour}:00
                  </StyledTableCell>
                )
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          { days.map(day => (
            <StyledTableRow key={day}>
              <StyledTableCell sx={{border: 1}}>{day}</StyledTableCell>
              {
                hours.map(hour => {
                  if(timeInit(day, hour-1, raw)){
                    return (
                      <StyledTableCell sx={{border: 1, padding: 0, width: 70, height: 70}} key={hour}
                                       component="th" scope="row">
                        <BookingForm date={day.substring(4)}
                                     time={hour}
                                     gymId={gymId}
                                     capacity={capacity}
                                     count={getBookingsCountByTime(bookings, day, hour)}
                                     refetchBookings={refetch}
                                     setResponseMessage={setResponseMessage}
                                     setSeverity={setSeverity}
                                     handleClick={handleClick} />
                      </StyledTableCell>
                    )
                  } else {
                    return (
                      <StyledTableCell sx={{border: 1, height: 1, width: 1,}} key={hour} component="th"
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
              hours.map(hour => {
                return (
                  <StyledTableCell key={hour} component="th"
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