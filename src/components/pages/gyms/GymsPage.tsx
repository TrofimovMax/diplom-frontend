import React from "react";
import {
  ThemeProvider,
  useMediaQuery,
  useTheme
} from "@mui/material";

import GymsTemplate from "@components/templates/GymsTemplate";
import {Theme} from "@mui/material/styles/createTheme";

const GymsPage: React.FC = () => {
  const theme: Theme = useTheme()
  const isMobile :boolean  = useMediaQuery(theme.breakpoints.up("sm"))
  return (
    <ThemeProvider theme={theme}>
      <GymsTemplate
        isMobile={isMobile}
      />
    </ThemeProvider>
  );
};

export default GymsPage;