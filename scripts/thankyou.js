import { loaderFadeOut, toggleLightMode, toggleHamburgerMenu } from "./functions.js";



//#region Loader Fade Out, Darkmode/Lightmode Toggle, Hamburger Menu
document.addEventListener("DOMContentLoaded", () => {
  loaderFadeOut();
  toggleLightMode();
  toggleHamburgerMenu();
});
//#endregion



//#region Form Details
const formInfo = new URLSearchParams(window.location.search);

document.getElementById("results").innerHTML = `
  <h1>Thank You, <span>${formInfo.get("firstname")}</span>!</h1>

  <p>Your message has been <span>sent</span>!</p>

  <p>Name: <span>${formInfo.get("firstname")} ${formInfo.get("lastname")}</span></p>

  <p>Submitted: <span>${formInfo.get("timestamp")}</span></p>

  <a href="contact.html">< Back to Contact Page</a>
`;
//#endregion


