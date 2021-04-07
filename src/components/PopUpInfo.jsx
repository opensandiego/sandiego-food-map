import React from "react";
import { Marker, Popup } from "react-leaflet";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  youAreHere: {
    backgroundColor: 'red',
    color: 'white',
    padding: 20, 
    borderRadius: 15, 
    margin: -20,
  },
}))

const PopUpInfo = ({ d, position, icon, setDetail, isLocating}) => {
  const classes = useStyles();
  return (
    <Marker key={d.Id} position={position} icon={icon} isLocating={isLocating}>
      {isLocating ? (
        <Popup>
          <Box className={classes.youAreHere} >
            YOU ARE HERE
          </Box>
        </Popup>
      ) : (
        <Popup>
          {d.Name}
          <br />
          {d.Physical_Address__c}, {d.Physical_City__c}
          <br />
          {d.Phone_Number__c}
          <br />
          <Button
            onClick={() => {
              setDetail(d);
            }}
          >
            Learn More
          </Button>
        </Popup>
      )}
    </Marker>
  );
};

export default PopUpInfo;
