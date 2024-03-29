import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Button,
  TableRow, useMediaQuery, useTheme,
} from "@mui/material";
import React, {useEffect} from "react";
import { StyledTableCell, StyledTableRow } from './styles';
import { hours, days } from './constants';
import { useQuery } from "react-query";
import { getByQueryKey } from "@/api/getByQueryKey";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import CellContent from "@/components/templates/GymIdTemplate/molecules/CellContent";
import CellEditContent from "@/components/templates/GymIdTemplate/molecules/CellEditContent";
import {useRouter} from "next/router";

const GymTable = ({ data, isEdit, newSchedule}) => {
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'))
  const tableWidth = isMobile? 1200: 320;

  const { isLoading, isError, data: dataBookings, error, refetch } =
    useQuery(["gyms", id, "bookings" ], getByQueryKey,  {enabled: !!id,retry:2});
  const {
    isLoading: loadingWishes,
    isError: isErrorWishes,
    data: dataWishes,
    error:errorWish,
    refetch: refetchWishes} =
    useQuery(["gyms", id, "wishes" ], getByQueryKey, {enabled: !!id,retry:2});
  const { data: userData } = useQuery(["current_user"], getByQueryKey, {retry:1});

  const userId = userData?.data?.id || null;
  const bookings = dataBookings?.data || [];
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
              {data?.address}
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
                        key = {hour}
                        data = {data}
                        day = {day}
                        hour = {hour}
                        bookings = {bookings}
                        wishes = {wishes}
                        newSchedule={newSchedule}
                      />
                    )
                  }
                  else {
                    return (
                      <CellContent
                        userId = {userId}
                        key = {hour}
                        refetch={refetch}
                        refetchWishes = {refetchWishes}
                        day = {day}
                        hour = {hour}
                        bookings = {bookings}
                        wishes = {wishes}
                        data = {data}
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