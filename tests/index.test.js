import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Index from '../src/index'


Enzyme.configure({ adapter: new Adapter()})

describe('index', ()=> {
    it('should show text', ()=> {
        //Enzymes shallow function allows us to render React components when object in memory instead of the dom, which makes it faster. 
        //It wraps that object in a wrapper, that gives us functions to easily examine the rendered component. 
        const wrapper = shallow(<Index/>)
        const text = wrapper.find('Dialog Container Typography')
        expect(text.text()).toBe('Text goes here');
    })
})

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