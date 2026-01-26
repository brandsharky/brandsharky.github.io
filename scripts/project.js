
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


//#region Under the Hood

// Toggle Panel Visibility
const settingsBtn = document.getElementById("settings-btn");
const panel = document.getElementById("settings-panel");

settingsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  panel.classList.toggle("open");
});

document.addEventListener("click", () => {
  panel.classList.remove("open");
});

panel.addEventListener("click", (e) => {
  e.stopPropagation();
});



// Created / Updated
document.getElementById("created").textContent = "November 13, 2025";

const updated = new Date(document.lastModified).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric"
});
document.getElementById("modified").textContent = updated;



// Local Time
function updateTime() {
  const now = new Date();
  document.getElementById("time").textContent =
    now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    });
}
updateTime();
setInterval(updateTime, 60000);



// Viewport
function updateViewport() {
  document.getElementById("viewport").textContent =
    `${window.innerWidth} × ${window.innerHeight}`;
}
updateViewport();
window.addEventListener("resize", updateViewport);



// Browser Detection
const ua = navigator.userAgent;
let browser = "Unknown";

if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
else if (ua.includes("Firefox")) browser = "Firefox";
else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
else if (ua.includes("Edg")) browser = "Edge";

document.getElementById("browser").textContent = browser;



// Weather (Fahrenheit)
function describeWeather(tempF, windMph, code) {
  let tempDesc = "";
  if (tempF < 40) tempDesc = "Cold air";
  else if (tempF < 55) tempDesc = "Cool breeze";
  else if (tempF < 70) tempDesc = "Mild weather";
  else if (tempF < 85) tempDesc = "Warm air";
  else tempDesc = "Hot sun";

  let skyDesc = "clear skies";
  if ([1, 2].includes(code)) skyDesc = "mostly clear skies";
  else if (code === 3) skyDesc = "overcast skies";
  else if (code >= 45 && code <= 48) skyDesc = "misty air";
  else if (code >= 51 && code <= 67) skyDesc = "light rain";
  else if (code >= 71 && code <= 77) skyDesc = "falling snow";
  else if (code >= 80 && code <= 82) skyDesc = "passing showers";
  else if (code >= 95) skyDesc = "distant thunderstorms";

  return `${tempDesc}, ${skyDesc}`;
}

function fetchWeather(lat, lon) {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph`
  )
    .then(res => res.json())
    .then(data => {
      const w = data.current_weather;
      const description = describeWeather(
        w.temperature,
        w.windspeed,
        w.weathercode
      );

      document.getElementById("weather").textContent =
        `${description} (${Math.round(w.temperature)}°F)`;
    })
    .catch(() => {
      document.getElementById("weather").textContent =
        "Weather unavailable";
    });
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => fetchWeather(pos.coords.latitude, pos.coords.longitude),
    () => {
      document.getElementById("weather").textContent =
        "Location unavailable";
    }
  );
} else {
  document.getElementById("weather").textContent =
    "Geolocation not supported";
}
//#endregion


