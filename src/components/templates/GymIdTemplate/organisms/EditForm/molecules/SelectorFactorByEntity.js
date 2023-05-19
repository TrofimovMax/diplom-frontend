import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const SelectorFactorByEntity = ({entity, value, setValue}) => {
  const handleChange = (value) => {
    setValue(value.target.value)
  }
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{entity}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={entity}
        onChange={handleChange}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={1.5}>1.5</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={2.5}>2.5</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={3.5}>3.5</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={4.5}>4.5</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={5.5}>5.5</MenuItem>
        <MenuItem value={6}>6.5</MenuItem>
        <MenuItem value={6.5}>6.5</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={7.5}>7.5</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={8.5}>8.5</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={9.5}>9.5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectorFactorByEntity;