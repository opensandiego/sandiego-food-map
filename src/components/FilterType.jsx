import React from "react";

import Button from "@material-ui/core/Button";

const soup_kitchen_regex = RegExp("/(?:)lunch|meal|breakfast|dinner/", "i");

const soupKitchenFilter = (site) => soup_kitchen_regex.test(site);
const foodPantryFilter = (site) => !soup_kitchen_regex.test(site);
const allSitesFilter = () => true;

const FilterType = ({ addFilter }) => {
  const changeSiteFilter = (filterer) => addFilter("Description__c", filterer);
  return (
    <React.Fragment>
      <Button onClick={() => changeSiteFilter(soupKitchenFilter)}>
        Soup Kitchens
      </Button>
      <Button onClick={() => changeSiteFilter(foodPantryFilter)}>
        Food Pantries
      </Button>
      <Button onClick={() => changeSiteFilter(allSitesFilter)}>
        All Sites
      </Button>
    </React.Fragment>
  );
};

export default FilterType;
