// import React from "react";
// import { shallow } from "enzyme";
// import NavMenu from "./NavMenu";
// import Enzyme from "enzyme";
// import Adapter from "@cfaester/enzyme-adapter-react-18";
// import NavMenuItem from "./NavMenuItem";

// Enzyme.configure({ adapter: new Adapter() });
// // Tests that NavMenu is rendered with navMenu=true.
// it("test_nav_menu_rendered_with_nav_menu_true", () => {
//   const handleNavMenu = jest.fn();
//   const navMenu = true;
//   const wrapper = shallow(
//     <NavMenu handleNavMenu={handleNavMenu} navMenu={navMenu} />
//   );
//   expect(wrapper.exists()).toBe(true);
// });

// it("test_nav_menu_renders_with_nav_menu_false", () => {
//   // Arrange
//   const handleNavMenu = jest.fn();
//   const navMenu = false;

//   // Act
//   const wrapper = shallow(
//     <NavMenu handleNavMenu={handleNavMenu} navMenu={navMenu} />
//   );

//   // Assert
//   expect(wrapper.find(".nav-menu-off")).toHaveLength(1);
// });

// // Tests that there are no external dependencies.
// it("test_no_external_dependencies", () => {
//   // Arrange

//   // Act

//   // Assert
//   expect(require("../../../assets/icons/nav-button.svg")).toBeDefined();
//   expect(require("../../../hooks/useHandleMenuItemClick.js")).toBeDefined();
// });

// // Tests that clicking on NavMenuItem with handleClick prop calls handleMenuItemClick function.
// it("test_nav_menu_item_click_calls_handle_menu_item_click", () => {
//   // Arrange
//   const handleMenuItemClick = jest.fn();
//   const handleClick = jest.fn();
//   const wrapper = shallow(
//     <NavMenuItem label="ABOUT US" to="#" handleClick={handleClick} />
//   );
//   wrapper.setProps({ handleClick: handleMenuItemClick });

//   // Act
//   wrapper.find("Link").simulate("click");

//   // Assert
//   expect(handleMenuItemClick).toHaveBeenCalled();
// });
