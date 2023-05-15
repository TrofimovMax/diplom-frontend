import React from 'react';
import {createTheme, Link as MUILink, ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import NextLink from "next/link";
const theme = createTheme({
  palette: {
    links: "#fff",
    redLinks: "#ff6479",
    '&:hover': {
      links_hover: "#f4576c",
      redLinks_hover: "#f4576c",
    },
  },
});
const LinkAtom = ({children, href, color = null, color_hover= null}) => {
  const linkColor = color ? color : 'links';
  const linkColorHover = color_hover ? color_hover : '&:hover.links_hover';
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NextLink
        href={href} passHref legacyBehavior>
        <MUILink
          sx={{
            color: linkColor,
            '&:hover': {
              color: linkColorHover
            },
          }}
        >
          {children}
        </MUILink>
      </NextLink>
    </ThemeProvider>

  );
};

export default LinkAtom;