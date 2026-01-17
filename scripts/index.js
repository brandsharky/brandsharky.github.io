
//#region Loader Fade out
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  const MIN_TIME = 1000; // minimum 1.0s
  let loadComplete = false;
  let minTimePassed = false;

  // 1. Timer to guarantee minimum loader time
  setTimeout(() => {
    minTimePassed = true;
    if (loadComplete) fadeOutLoader();
  }, MIN_TIME);

  // 2. When page finishes loading assets
  window.addEventListener("load", () => {
    loadComplete = true;
    if (minTimePassed) fadeOutLoader();
  });

  // 3. Fade-out & fade-in function
  function fadeOutLoader() {
    loader.classList.add("fade-out");

    // Wait for loader fade-out to finish before showing content
    setTimeout(() => {
      content.classList.add("show");
    }, 1500); // match your CSS transition
  }
});

//#endregion


//#region Darkmode/Lightmode Toggle
let darkmode = localStorage.getItem("lightmode");
const themeSwitch = document.getElementById("theme-switch");

const enableLightmode = () => {
  document.body.classList.add("lightmode");
  localStorage.setItem("lightmode", "active");
};

const disableLightmode = () => {
  document.body.classList.remove("lightmode");
  localStorage.setItem("lightmode", null);
};

if (darkmode === "active") enableLightmode();

themeSwitch.addEventListener("click", () => {
  document.startViewTransition(() => {
    darkmode = localStorage.getItem("lightmode");
    darkmode !== "active" ? enableLightmode() : disableLightmode();
  });
});
//#endregion


//#region Hamburger Menu
const nav = document.querySelector(".navbar");
const toggle = document.querySelector(".nav-toggle");

toggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  toggle.textContent = nav.classList.contains("open") ? "✖" : "☰";
});
//#endregion


//#region Typing Adjectives Animation
const words = ["developer", "programmer", "creator", "problem solver", "tinkerer", "thinker", "student", "dreamer"];
const typedText = document.getElementById("typed");

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeAnimation() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    // typing Forward
    typedText.textContent = currentWord.slice(0, letterIndex + 1);
    letterIndex++;

    // once the word is fully typed
    if (letterIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeAnimation, 3000); // pause before deleting
      return;
    }
  } else {
    // deleting backward
    typedText.textContent = currentWord.slice(0, letterIndex - 1);
    letterIndex--;

    // once the word is fully deleted
    if (letterIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // go to next word
      setTimeout(typeAnimation, 1000); // empty pause before next word
      return;
    }
  }

  setTimeout(typeAnimation, isDeleting ? 90 : 130); // delete_speed : typing speed
}

typeAnimation(); // start animation
//#endregion


//#region Copy Email
const user = "basharky";
const domain = "outlook.com";

const emailLink = document.getElementById("email-link");
const emailUsername = document.getElementById("email-username");
const copyBtn = document.getElementById("copy-btn");

const email = `${user}@${domain}`;
const emailText = `${user}`;

// Build email text + mailto dynamically
emailUsername.textContent = emailText;
emailLink.href = `mailto:${email}`;

// Copy functionality
copyBtn.addEventListener("click", (e) => {
  e.preventDefault(); // safety
  navigator.clipboard.writeText(email);
});
//#endregion


