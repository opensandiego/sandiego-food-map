import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    backgroundColor: {
      backgroundColor: "red",
    },
    input: {
      color: "white",
    },
    addressSearchBar: { width: "20%" },
    searchButton: {
      marginTop: "1vw",
      marginBottom: "1vw",
      marginRight: "5%",
    },
  });

const AddressLookUp = ({ onSearchComplete, classes }) => {
  const [search, setSearch] = React.useState([32.8546305, -117.051348]);

  const onClick = () => {
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${search}&viewbox=-119.39075%2C33.51674%2C-116.28162%2C32.54735&bounded=1&format=jsonv2`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("Not successful");
        }
      })
      .then((data) => {
        onSearchComplete(data);
      })
      .catch((error) => console.log(error));
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <TextField
        className={classes.addressSearchBar}
        placeholder="look up an address"
        onChange={onChange}
        name="search"
        InputProps={{
          className: classes.input,
        }}
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

export default withStyles(styles)(AddressLookUp);
