import { loaderFadeOut, toggleLightMode, toggleHamburgerMenu } from "./functions.js";



//#region Loader Fade Out, Darkmode/Lightmode Toggle, Hamburger Menu
document.addEventListener("DOMContentLoaded", () => {
  loaderFadeOut();
  toggleLightMode();
  toggleHamburgerMenu();
});
//#endregion



//#region Timeline Fade-In
(function () {
  "use strict";

  // define variables
  var items = document.querySelectorAll(".timeline ul li");

  // check if an element is in viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8;
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();
//#endregion


