import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow, useMediaQuery, useTheme,
} from "@mui/material";
import React from "react";
import { StyledTableCell, StyledTableRow } from './styles';
import { hours, days } from './constants';
import { useQuery } from "react-query";
import { getByQueryKey } from "@/api/getByQueryKey";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import CellContent from "@/components/templates/GymIdTemplate/molecules/CellContent";
import CellEditContent from "@/components/templates/GymIdTemplate/molecules/CellEditContent";

const GymTable = ({address, gymId, raw, capacity, isEdit, newSchedule}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'))
  const tableWidth = isMobile? 1200: 320;

  const { isLoading, isError, data, error } = useQuery(["gyms", gymId, "bookings" ], getByQueryKey);
  const { isLoading: loadingWishes, isError: isErrorWishes, data: dataWishes, error:errorWish} = useQuery(["gyms", gymId, "wishes" ], getByQueryKey);
  const { data: userData } = useQuery(["current_user"], getByQueryKey);

  const userId = userData?.data?.id || null;
  const bookings = data?.data || [];
  const wishes = dataWishes?.data || [];
  const message = error?.message || errorWish?.message;

  if (isLoading && loadingWishes) return (<IsLoading />)
  if (isError || isErrorWishes) return (<IsError message={message}/>)

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: {tableWidth} }} aria-label="customized table">
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
                  if (isEdit){
                    return (
                      <CellEditContent
                        userId = {userId}
                        key = {hour}
                        gymId = {gymId}
                        day = {day}
                        hour = {hour}
                        capacity = {capacity}
                        bookings = {bookings}
                        wishes = {wishes}
                        schedule = {raw}
                        newSchedule={newSchedule}
                      />
                    )
                  }
                  else {
                    return (
                      <CellContent
                        userId = {userId}
                        key = {hour}
                        gymId = {gymId}
                        day = {day}
                        hour = {hour}
                        capacity = {capacity}
                        bookings = {bookings}
                        wishes = {wishes}
                        schedule = {raw}
                      />
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