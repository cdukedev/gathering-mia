import { animateScroll as scroll } from "react-scroll";

// This function scrolls to the element with the given hash
const scrollToElement = (hash) => {
  // Use react-scroll to animate scrolling to the element
  scroll.scrollTo(document.getElementById(hash).offsetTop);
};

export default scrollToElement;
