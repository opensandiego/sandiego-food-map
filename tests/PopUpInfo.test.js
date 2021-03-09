import React from 'react';
import Enzyme, { render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PopUpInfo from '../src/components/PopUpInfo.jsx'


Enzyme.configure({ adapter: new Adapter()})

const setUp = (props={}) => {
    const component = shallow(<PopUpInfo {...props} />)
    return component;
}

describe('PopUpInfo', ()=> {
    it('should show text', ()=> {
        // render(<PopUpInfo d={data} position={position} icon={icon} setDetail={setDetail}></PopUpInfo>)
        const component = setUp();
        console.log(component.debug())
        const wrapper = component.find('Marker')
        expect(wrapper.length).toBe(1);
        // const text = wrapper.find('Marker Popup Button')
        // expect(text.text()).toBe('Text goes here');
    })
})

        //Enzymes shallow function allows us to render React components when object in memory instead of the dom, which makes it faster. 
        //It wraps that object in a wrapper, that gives us functions to easily examine the rendered component. 
        // const wrapper = shallow(<PopUpInfo/>)
        // const text = wrapper.find('Marker Popup Button')
        // expect(text.text()).toBe('Text goes here');

//the describe function groups related tests into a block to create a test suite.
//This makes the test output more readable. 
// describe('Index', ()=>{
//     // to define a test the "it"-function is used
// it('should be true', ()=>  {
//     const foo = true;
// //expect takes the value to test and the matcher (toBe) defines what we expect the value to be like. 
//     expect(foo).toBe(true);
// });
// it('should be false', ()=> {
//     const foo = true;
//     expect(foo).toBe(false);
// })
// });