import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import { makeStyles, useTheme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
searchButton: {
      marginTop: "1vw",
      marginBottom: "1vw",
      marginRight: "5%",
    },
    addressSearchBar: {
      color: "white",
      width: "20%",
    },}))


const AddressLookUp = ({ onClick, onChange }) => {
const classes = useStyles();
  return (
    <>
      <TextField
        className={classes.addressSearchBar}
        placeholder="look up an address"
        color="inherit"
        onChange={onChange}
        name="search"
      />
      <Button
        startIcon={<SearchIcon />}
        color="inherit"
        onClick={onClick}
        className={classes.searchButton}
      >
        Search
      </Button>
    </>
  );
};

export default AddressLookUp;
