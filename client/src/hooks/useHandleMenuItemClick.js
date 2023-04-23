import { useCallback } from "react";
import scrollToElement from "../utils/scrollToElement";

export const useHandleMenuItemClick = (handleNavMenu) => {
  const handleMenuItemClick = useCallback(
    (hash) => {
      scrollToElement(hash);
      handleNavMenu();
    },
    [handleNavMenu]
  );

  return handleMenuItemClick;
};
