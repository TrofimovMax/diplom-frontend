import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import moment from 'moment';
import { createWeekSchedule, hasHourInSchedule} from './utils';
import { StyledTableCell, StyledTableRow } from './styles';
import { hours } from './constants';
import { useQuery } from "react-query";
import { getByQueryKey } from "@/api/getByQueryKey";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import CellContent from "@/components/templates/GymIdTemplate/molecules/CellContent";

const GymTable = ({address, gymId, raw, capacity}) => {

  const { isLoading, isError, data, refetch } = useQuery(["gyms", gymId, "bookings" ], getByQueryKey);

  const bookings = data?.data || []

  if (isLoading) return (<IsLoading />)
  if (isError) return (<IsError message={error}/>)

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
                  return (
                    <CellContent
                      key = {hour}
                      gymId = {gymId}
                      day = {day}
                      hour = {hour}
                      capacity = {capacity}
                      bookings = {bookings}
                      refetch = {refetch}
                      schedule = {raw}
                    />
                  )
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