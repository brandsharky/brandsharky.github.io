import { loaderFadeOut, toggleLightMode, toggleHamburgerMenu } from "./functions.js";



//#region Loader Fade Out, Darkmode/Lightmode Toggle, Hamburger Menu
document.addEventListener("DOMContentLoaded", () => {
  loaderFadeOut();
  toggleLightMode();
  toggleHamburgerMenu();
});
//#endregion



//#region Form Timestamp
document.getElementById("timestamp").value = new Date().toISOString();
//#endregion




//#region Form Submission
document.addEventListener("DOMContentLoaded", () => {
  // Make sure EmailJS exists
  if (typeof emailjs === "undefined") {
    console.error("EmailJS not loaded");
    return;
  }

  // Init EmailJS
  emailjs.init("BaXKE9IgUUAGPJ1Yu");

  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const templateParams = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
      timestamp: document.getElementById("timestamp").value,
    };

    emailjs
      .send("service_tpxhqz9", "template_g2dicjb", templateParams)
      .then(() => {
        // Build query string
        const params = new URLSearchParams({
          firstname: templateParams.firstname,
          lastname: templateParams.lastname,
          timestamp: templateParams.timestamp
          // 🔒 Only include safe data (avoid putting full message/email in URL)
        });

        // Redirect after slight delay
        setTimeout(() => {
          window.location.href = "thankyou.html?" + params.toString();
        }, 500);
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("Failed to send email.");
      });
  });
})
//#endregion


