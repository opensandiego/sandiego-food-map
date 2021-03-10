import React from 'react';
import Enzyme, { render, shallow } from 'enzyme';
import DetailDialog from '../src/components/DetailDialog.jsx'
import Adapter from 'enzyme-adapter-react-16';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const detail = {
    "Id": "a1j41000000fAnwAAE",
    "Name": "Food Distribution",
    "Description__c": "Offers a healthy option food pantry and clothing closet to low income residents of Chula Vista and Bonita. Qualified residents are eligible to receive  emergency food distribution  and may access the clothes closet as needed. Also refers to other community services..",
    "Full_Service_Name__c": "Food Distribution; St Rose of Lima Catholic Parish",
    "Hours_of_Operation__c": "9:00 am-11:30 am Monday, Wednesday and Friday (Sack Lunches); 9:00 am-11:00 am  (Food distribution)Monday (Clothing); 3:00 pm-4:30 pm Monday, Wednesday, and Friday (Food Distribution).",
    "Agency__c": "0014100000aV5fkAAC",
    "What_to_do_next__c": "<br>Intake Procedure: <br>-Call for more information<br>-Walk-in for more information<br><br>Documents Required: <br>-Driver&#39;s license<br>-State ID<br>-Proof of Residency<br>",
    "Geo_Location__Latitude__s": 32.6358359,
    "Geo_Location__Longitude__s": -117.0769584,
    "Physical_Address__c": "278 ALVARADO ST",
    "Physical_City__c": "CHULA VISTA",
    "Physical_State__c": "CA",
    "Physical_Zip_Code__c": "91910",
    "Phone_Number__c": "(619) 427-7637",
    "Physical_Address_Verified__c": true,
    "Service_Status__c": "Active",
    "Last_Review_Date__c": "2019-05-16",
    "Confidential__c": false,
    "Eligibility__c": "Low income residents of Chula Vista and Bonita. Must provide proof of address (ex: utility bill/rent receipt) and photo ID.",
    "Agency__r": {
      "Name": "St Rose of Lima Catholic Parish",
      "Id": "0014100000aV5fkAAC"
    }
}

const setUp = () => {
    const component = shallow(<DetailDialog classes={{}} handleDetailClose={() => {}} detail={detail} />)
    return component;
}

Enzyme.configure({ adapter: new Adapter()})
describe('DetailDialog', ()=> {
    it('should find a specific element', () => {
        const component = setUp();
        //find() is always looking for children.
        const wrapper = component.dive().find(Dialog).shallow().find(Container).shallow().find(Typography)
        expect(wrapper.length).toBe(9);
        expect(wrapper.someWhere((n) =>
            n.text().includes(detail.Description__c) 
        )).toBe(true);
    })
})