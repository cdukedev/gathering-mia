import { animateScroll as scroll } from "react-scroll";

export const scrollToElement = (hash) => {
  scroll.scrollTo(document.getElementById(hash).offsetTop);
};
