import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, useTheme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
searchButton: {
      marginTop: "1vw",
      marginBottom: "1vw",
      marginRight: "10%",
    },
    addressSearchBar: {
      color: "white",
      width: "50%",
    },}))


const AddressLookUp = ({ handleClick, handleZipChange }) => {
const classes = useStyles();
  return (
    <>
      <TextField
        className={classes.addressSearchBar}
        placeholder="look up an address"
        color="inherit"
        onChange={handleZipChange}
        name="search"
      />
      <Button
        startIcon={<SearchIcon />}
        color="inherit"
        onClick={handleClick}
        className={classes.searchButton}
      >
        Search
      </Button>
    </>
  );
};

export default AddressLookUp;
