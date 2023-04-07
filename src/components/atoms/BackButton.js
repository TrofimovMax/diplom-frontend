import React from 'react';
import NextLink from "next/link";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {IconButton} from "@mui/material";

const BackButton = ({router, link}) => {
  return (
    <IconButton
      color="primary"
      aria-label="add to shopping cart"
      component='button'
      LinkComponent={NextLink}
      onClick={() => router.push(link)}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

export default BackButton;