import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: { marginLeft: 10 },
});

const soup_kitchen_regex = RegExp("/(?:)lunch|meal|breakfast|dinner/", "i");

const soupKitchenFilter = (site) => soup_kitchen_regex.test(site);
const foodPantryFilter = (site) => !soup_kitchen_regex.test(site);
const allSitesFilter = () => true;

const FilterType = ({ addFilter }) => {
  const changeSiteFilter = (filterer) => addFilter("Description__c", filterer);
  const classes = useStyles();
  return (
    <span className={classes.root}>
      <Button
        color="inherit"
        onClick={() => changeSiteFilter(soupKitchenFilter)}
      >
        Soup Kitchens
      </Button>
      <Button
        color="inherit"
        onClick={() => changeSiteFilter(foodPantryFilter)}
      >
        Food Pantries
      </Button>
      <Button color="inherit" onClick={() => changeSiteFilter(allSitesFilter)}>
        All Sites
      </Button>
    </span>
  );
};

export default FilterType;
