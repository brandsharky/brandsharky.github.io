
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



//#region Create Projects
const projects = [
  {
    title: "Edufutbol",
    description: "Edufutbol is a solo web project that explores the history and culture of soccer, designed to educate and engage users through accessible, sports-focused content.",
    linkUrl: "http://edufutbol.com/",
    imageUrl: "images/project-one.png",
    linkContent: "Edufutbol.com",
    earlier: false,
  },
  {
    title: "Eternal Quest",
    description: "A C# goal-tracking application that motivates users through a points and ranking system and supports one-time, repeatable, and ongoing goals.",
    linkUrl: "https://github.com/brandsharky/projects/tree/main/EternalQuest",
    imageUrl: "images/project-eight.png",
    linkContent: "Github",
    earlier: false,
  },
  {
    title: "Shark Tides",
    description: "A responsive, educational website that provides beginner-friendly shark facts, images, and a quiz while following the principles of dynamic web design.",
    linkUrl: "https://brandsharky.github.io/projects/Shark%20Tides/",
    imageUrl: "images/project-seven.png",
    linkContent: "Shark Tides",
    earlier: false,
  },
  {
    title: "Task Force One",
    description: "A Python-based daily planner that allows users to add tasks by date, helping organize and manage daily responsibilities through a simple interface.",
    linkUrl: "https://github.com/brandsharky/projects/tree/main/Taskforce%20One",
    imageUrl: "images/project-three.png",
    linkContent: "Github",
    earlier: false,
  },
  {
    title: "Mindfullness",
    description: "A C# application that guides users through structured breathing, reflection, and listing exercises, helping reduce stress and build consistent mindfulness habits.",
    linkUrl: "https://github.com/brandsharky/projects/tree/main/Mindfulness",
    imageUrl: "images/project-eleven.png",
    linkContent: "Github",
    earlier: false,
  },
  {
    title: "Scripture Memorizer",
    description: "A C# application that helps users memorize scriptures through guided exercises that progressively hide words, reinforcing recall and strengthening long-term memory.",
    linkUrl: "https://github.com/brandsharky/projects/tree/main/ScriptureMemorizer",
    imageUrl: "images/project-twelve.png",
    linkContent: "Github",
    earlier: false,
  },
  {
    title: "UFO",
    description: "A C++ console game inspired by Hangman, where players guess letters to avoid being abducted by a UFO through progressively revealed ASCII visuals.",
    linkUrl: "https://github.com/brandsharky/projects/tree/main/UFO_GAME",
    imageUrl: "images/project-two.png",
    linkContent: "Github",
    earlier: false,
  },
  {
    title: "Daily Journal",
    description: "A C# journaling application that encourages consistent writing by providing daily prompts and automatically recording entries, making reflection more accessible and structured.",
    linkUrl: "https://github.com/brandsharky/projects/tree/main/Journal",
    imageUrl: "images/project-nine.png",
    linkContent: "Github",
    earlier: false,
  },
  {
    title: "Flappy Bird",
    description: "A Python-based Flappy Bird remake built by following a tutorial, serving as a hands-on exercise in game logic, physics, and user input handling.",
    linkUrl: "https://github.com/brandsharky/projects/tree/main/FlappyBird",
    imageUrl: "images/project-four.png",
    linkContent: "Github",
    earlier: false,
  },
  {
    title: "Form Validation",
    description: "A simple PHP-based form validation project that ensures accurate and secure user input through server-side validation integrated with HTML forms.",
    linkUrl: "https://github.com/brandsharky/projects/tree/main/Form%20Validation",
    imageUrl: "images/project-five.png",
    linkContent: "Github",
    earlier: true,
  },
  {
    title: "The Coolest Creature",
    description: "My first website built from scratch. An early informational website about sharks featuring beginner-friendly facts and pictures.",
    linkUrl: "https://brandsharky.github.io/coolest-creature/",
    imageUrl: "images/project-six.png",
    linkContent: "Coolest Creature",
    earlier: true,
  },
  {
    title: "The Coolest Creature 2.0",
    description: "A JavaScript-driven informational shark website with interactive forms, user input handling, and a dynamic “days since” calculator.",
    linkUrl: "https://brandsharky.github.io/CISIWEB-74/Coolest%20Creature/",
    imageUrl: "images/project-ten.png",
    linkContent: "Coolest Creature 2.0",
    earlier: true,
  },
];
const gallery = document.querySelector(".projects");


function createProjectCard(project, counter) {
  // main card
  const card = document.createElement("div");
  card.classList.add("project-card");


  // badge
  if (project.earlier) {
    const badge = document.createElement("span");
    badge.classList.add("badge");
    badge.textContent = "Earlier Project";
    card.appendChild(badge);
  }


  // preview div
  const preview = document.createElement("div");
  preview.classList.add("project-preview");

  const img = document.createElement("img");
  img.src = project.imageUrl;
  img.alt = `Screenshot of Project ${counter}`;

  preview.appendChild(img);


  // content div
  const content = document.createElement("div");
  content.classList.add("project-content");

  const title = document.createElement("h2");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;


  const linksDiv = document.createElement("div");
  linksDiv.classList.add("project-links");

  const link = document.createElement("a");
  link.href = project.linkUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = project.linkContent;


  // assemble content
  linksDiv.appendChild(link);
  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(linksDiv);


  // assemble card
  card.appendChild(preview);
  card.appendChild(content);

  return card;
}

projects.forEach((project, index) => {
  const card = createProjectCard(project, index + 1);
  gallery.appendChild(card);
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


