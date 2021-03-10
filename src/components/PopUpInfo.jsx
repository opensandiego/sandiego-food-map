import React from "react";
import { Marker, Popup } from "react-leaflet";
import Button from '@material-ui/core/Button';

const PopUpInfo = ({ d, position, icon, setDetail }) => 
{
  return (
  <Marker key={d.Id} position={position} icon={icon}>
    <Popup>
        test
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
  </Marker>
    );
};

export default PopUpInfo;