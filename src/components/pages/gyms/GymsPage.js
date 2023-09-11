import React from 'react';
import {
  ThemeProvider,
  useMediaQuery,
  useTheme
} from "@mui/material";

import GymsTemplate from "components/templates/GymsTemplate";

const GymsPage = ({data, Images, Benefits, router, pathname, gymIdCard}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <ThemeProvider theme={theme}>
      <GymsTemplate
        data = {data}
        Images = {Images}
        Benefits = {Benefits}
        router = {router}
        pathname = {pathname}
        gymIdCard = {gymIdCard}
        isMobile={isMobile}
      />
    </ThemeProvider>
  );
};

export default GymsPage;