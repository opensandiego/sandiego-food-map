import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilterType from "../src/components/FilterType.jsx";

Enzyme.configure({ adapter: new Adapter() });

//Enzymes shallow function allows us to render React components when object in memory instead of the dom, which makes it faster.
//It wraps that object in a wrapper, that gives us functions to easily examine the rendered component.
const setUp = () => {
  let data = { fields: [], filters: [] };
  const component = shallow(
    <FilterType
      addFilter={(field, filter) => {
        data.fields.push(field);
        data.filter.push(filter);
      }}
    />
  );

  return [component, data];
};
//the describe function groups related tests into a block to create a test suite.
//This makes the test output more readable.
describe("FilterType", () => {
  it("should have each button filter differently", () => {
    const [component, data] = setUp();
    component.find("button").forEach((button) => {
      button.simulate("click");
    });
    let are_filters_different =
      new Set(data.filters).length === data.filters.length;
    expect(are_filters_different).toBe(false);
  });
});
