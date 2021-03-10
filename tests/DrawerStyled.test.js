import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DrawerStyled from '../src/components/DrawerStyled.jsx'
import Drawer from "@material-ui/core/Drawer";


Enzyme.configure({ adapter: new Adapter()})

//Enzymes shallow function allows us to render React components when object in memory instead of the dom, which makes it faster. 
//It wraps that object in a wrapper, that gives us functions to easily examine the rendered component. 
const setUp = () => {
    const component = shallow(<DrawerStyled open={true} handleDrawerClose={{}} theme={{}} classes={{}} />)

    return component;
}
//the describe function groups related tests into a block to create a test suite.
//This makes the test output more readable. 
describe('DrawerStyled', ()=> {
    it('should show component', ()=> {
        const component = setUp();
        console.log(component.debug())
        const wrapper = component.find(Drawer)
        //expect takes the value to test and the matcher (toBe) defines what we expect the value to be like. 
        expect(wrapper.length).toBe(1);
    })
})
