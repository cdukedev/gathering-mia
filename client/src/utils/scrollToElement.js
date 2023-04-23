import { animateScroll as scroll } from "react-scroll";

const scrollToElement = (hash) => {
  scroll.scrollTo(document.getElementById(hash).offsetTop);
};

export default scrollToElement;
