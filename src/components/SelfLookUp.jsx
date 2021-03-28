import React from "react";

import Button from "@material-ui/core/Button";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  searchButton: {
    marginTop: "1vw",
    marginBottom: "1vw",
    marginRight: "5%",
  },
}));

const SelfLookUp = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Button
      startIcon={<LocationSearchingIcon />}
      color="inherit"
      onClick={onClick}
      className={classes.searchButton}
    >
      Locate Me
    </Button>
  );
};

export default SelfLookUp;
