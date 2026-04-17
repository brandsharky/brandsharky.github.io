import { loaderFadeOut, toggleLightMode, toggleHamburgerMenu } from "./functions.js";



//#region Loader Fade Out, Darkmode/Lightmode Toggle, Hamburger Menu
document.addEventListener("DOMContentLoaded", () => {
  loaderFadeOut();
  toggleLightMode();
  toggleHamburgerMenu();
});
//#endregion



//#region Typing Adjectives Animation
const words = ["who am i", "i am an aspiring machine learning engineer", "i am a software developer", "i am a programmer", "i am a creator", "i am a problem solver", "i am a tinkerer", "i am a thinker", "i am a student", "i am a hard worker"];
const typedText = document.getElementById("type-text");

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


setTimeout(typeAnimation, 4000);
//#endregion



//#region Weather Fetch and Display
async function apiWeatherFetch() {
  try {
    const lat = "34.106622206413846";
    const lon = "-117.59446394634978";
    const key = "d4d2ef07ef422d2ec2f14b749024a3db";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      const weather = document.getElementById("weather");
      weather.innerHTML = `it is currently ${Math.round(data.main.temp)}&deg;F in ${data.name}`;

      const todayEl = document.getElementById("today");
      const today = new Date();
      const formatted = today.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      todayEl.textContent = `Today is ${formatted}`;
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiWeatherFetch();
//#endregion



//#region Copy Email
const emailLink = document.querySelector(".email-link")
const emailUsername = document.getElementById("email-username");
const copyBtn = document.querySelector(".copy-btn");

const user = "basharky";
const domain = "outlook.com";
const email = `${user}@${domain}`;
emailUsername.textContent = user;
emailLink.href = `mailto:${email}`;


copyBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();

  navigator.clipboard.writeText(email).then(() => {
    console.log("Copied!");

    copyBtn.style.color = "#00ff9c";
    copyBtn.style.transform = "scale(1.25)";

    setTimeout(() => {
      copyBtn.style.color = "";
      copyBtn.style.transform = "";
    }, 500);
  });
})
//#endregion


