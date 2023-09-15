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
import { StyledTableCell, StyledTableRow } from "./styles";
import { hours, days } from "./constants";
import { useQuery } from "react-query";
import { getByQueryKey } from "@api/getByQueryKey";
import IsLoading from "@components/molecules/isLoading";
import IsError from "@components/molecules/IsError";
import CellContent from "@components/templates/GymIdTemplate/molecules/CellContent";
import CellEditContent from "@components/templates/GymIdTemplate/molecules/CellEditContent";
import {useRouter} from "next/router";
import {useGetBookingByGymIdQuery} from "./__generated__/GetBookingByGymId.query";
import {useGetWishingByGymIdQuery} from "./__generated__/GetWishingByGymId.query";



const GymTable = ({ data, isEdit, newSchedule}) => {
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"))
  const tableWidth = isMobile? 1200: 320;

  const { data: bookingData, loading, error: apolloError } = useGetBookingByGymIdQuery({
    variables: { gym_id: id }, // Pass the gymId as a variable
  });

  const { loading: wishLoading, error: wishError, data: wishData } = useGetWishingByGymIdQuery( {
    variables: { gym_id: id }, // Pass the gymId as a variable
  });
  const { data: userData } = useQuery(["current_user"], getByQueryKey, {retry:1});

  const userId = userData?.data?.id || null;
  const bookings = bookingData?.getBookingByGymId || [];
  const wishes = wishData?.getWishingByGymId || [];
  const message = apolloError || wishError;
  if (loading && wishLoading) return (<IsLoading />)
  if (apolloError || wishError) return (<IsError message={message}/>)

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