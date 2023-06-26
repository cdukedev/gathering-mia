// import BackButton from "../Components/BackButton/BackButton";
// import React from "react";
// import { MemoryRouter } from "react-router-dom";
// import { mount } from "enzyme";
// import Enzyme from "enzyme";
// import Adapter from "@cfaester/enzyme-adapter-react-18";
// Enzyme.configure({ adapter: new Adapter() });

// const wrapper = mount(
//   <MemoryRouter>
//     <BackButton />
//   </MemoryRouter>
// );

// it("test_back_button_is_clickable", () => {
//   expect(wrapper.find("Link")).toHaveLength(1);
// });

// // Tests that clicking the button navigates to the home page ("/").
// it("test_back_button_navigates_home", () => {
//   wrapper.find("Link").simulate("click");
//   expect(wrapper.find("Link").prop("to")).toEqual("/");
// });

// // Tests that the Link component has a "to" prop with value "/".
// it("test_back_button_no_additional_props", () => {
//   expect(wrapper.find("Link").prop("to")).toEqual("/");
// });

// // Tests that the function renders a div with class "back-button".
// it("test_back_button_renders", () => {
//   expect(wrapper.find(".back-button")).toHaveLength(1);
// });

// // Tests that the div contains an image with alt text "back button".
// it("test_back_button_contains_image", () => {
//   expect(wrapper.find("img").prop("alt")).toEqual("back button");
// });

// // Tests that the function returns a React component.
// it("test_back_button_returns_react_component", () => {
//   expect(React.isValidElement(<BackButton />)).toBeTruthy();
// });
