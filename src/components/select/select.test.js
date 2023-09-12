import React, { useState } from "react";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import MuiSelect from ".";

configure({ adapter: new Adapter() });

const SelectWrapper = () => {
  const options = [{ key: "Option 1" }, { key: "Option 2" }];
  const [value, setValue] = useState([options[0]]);
  return (
    <MuiSelect
      options={options}
      value={value}
      handleChange={(e) => setValue(e.target.value)}
      valueKey="key"
    />
  );
};

describe("MuiSelect Component", () => {
  it("should render correctly with provided value", () => {
    const component = mount(<SelectWrapper />);
    expect(component).toBeTruthy();
  });
});
