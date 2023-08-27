import { CONSTANTS } from "./constants.js";

/**
 * Preprend logged message with the module title
 * @param {string} msg Message to print
 */
export const logger = (msg) => {
  console.log(`${CONSTANTS.MODULE_TITLE} | ${msg}`);
};

/**
 * Check if the current browser is Firefox
 * @returns {boolean} is Firefox
 */
export const isFF = () => navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
