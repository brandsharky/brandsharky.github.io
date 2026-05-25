
//#region Loader Fade Out
export function loaderFadeOut() {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  const MIN_TIME = 500; // minimum 0.5s
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
}
//#endregion



//#region Darkmode/Lightmode Toggle
export function toggleLightMode() {
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
}
//#endregion



//#region Hamburger Menu
export function toggleHamburgerMenu() {
  const nav = document.querySelector(".navbar");
  const toggle = document.querySelector(".nav-toggle");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.innerHTML = nav.classList.contains("open") ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>`;
  });
}
//#endregion



//#region Rain Animation
export function createRain() {
  const canvas = document.getElementById("rainCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let raindrops = [];

  function createDrop() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 15 + 10,
      velocityY: Math.random() * 1.5 + 4,
      opacity: Math.random() * 0.5 + 0.2,
    };
  }

  for (let i = 0; i < 10; i++) {
    raindrops.push(createDrop());
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#7b7b7b80";
    ctx.lineWidth = 1;

    for (let drop of raindrops) {
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + drop.length);
      ctx.stroke();
      drop.y += drop.velocityY;
      if (drop.y > canvas.height) {
        drop.y = -drop.length;
        drop.x = Math.random() * canvas.width;
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}
//#endregion


