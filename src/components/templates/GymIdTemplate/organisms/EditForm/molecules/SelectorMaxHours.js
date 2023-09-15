import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const SelectorMaxHours = ({entity, value, setValue}) => {
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
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={11}>11</MenuItem>
        <MenuItem value={12}>12</MenuItem>
        <MenuItem value={13}>13</MenuItem>
        <MenuItem value={14}>14</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={17}>17</MenuItem>
        <MenuItem value={18}>18</MenuItem>
        <MenuItem value={19}>19</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={21}>21</MenuItem>
        <MenuItem value={22}>22</MenuItem>
        <MenuItem value={23}>23</MenuItem>
        <MenuItem value={24}>24</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectorMaxHours;