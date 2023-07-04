import { useCallback } from "react";
import scrollToElement from "../utils/scrollToElement";

/**
 * Custom hook for handling menu item clicks.
 *
 * @param {function} handleNavMenu - The function to handle navigation menu.
 * @returns {function} - The memoized function for handling menu item clicks.
 * @stateChange None.
 * @dependencies React, useCallback, scrollToElement, handleNavMenu.
 */
export const useHandleMenuItemClick = (handleNavMenu) => {
  /**
   * Handle menu item click.
   * @param {string} hash - The hash value of the clicked menu item.
   * @dependencies scrollToElement, handleNavMenu.
   */
  const handleMenuItemClick = useCallback(
    (hash) => {
      scrollToElement(hash);
      handleNavMenu();
    },
    [handleNavMenu]
  );

  return handleMenuItemClick;
};
