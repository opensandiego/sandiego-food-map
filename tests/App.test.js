import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FoodMap from '../src/App.jsx';


describe('FoodMap', ()=> {
test('renders FoodMap', async()=> {
    render(<FoodMap/>)
    screen.debug()
})
})