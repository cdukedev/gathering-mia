import scrollToElement from "./scrollToElement";
import { animateScroll as scroll } from "react-scroll";

it("test_scroll_to_valid_element", () => {
  // Spy on and mock the scrollTo function
  const mockScrollTo = jest
    .spyOn(scroll, "scrollTo")
    .mockImplementation(() => {});

  // Create a mock element with a valid hash
  const mockElement = document.createElement("div");
  mockElement.id = "validHash";
  document.body.appendChild(mockElement);

  // Call the scrollToElement function with the valid hash
  scrollToElement("validHash");

  // Expect the scrollTo function to have been called with the correct offsetTop value
  expect(mockScrollTo).toHaveBeenCalledWith(mockElement.offsetTop);

  // Restore the original scrollTo function
  mockScrollTo.mockRestore();
});
