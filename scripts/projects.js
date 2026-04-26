import { loaderFadeOut, toggleLightMode, toggleHamburgerMenu } from "./functions.js";



//#region Loader Fade Out, Darkmode/Lightmode Toggle, Hamburger Menu
document.addEventListener("DOMContentLoaded", () => {
  loaderFadeOut();
  toggleLightMode();
  toggleHamburgerMenu();
  getProjects();
});
//#endregion



//#region JSON fetch
let allProjects = [];
async function getProjects() {
  try {
    const response = await fetch("data/projects.json");
    if (response.ok) {
      const data = await response.json();
      allProjects = data.projects;
      displayProjects(allProjects);
      setupFilters();
    } else {
      throw Error(await response.text());
    }
  } catch (err) {
    console.log(err);
  }
}
//#endregion



//#region Setup Filters
function setupFilters() {
  const container = document.querySelector(".filters")
  const filters = ["All", "HTML", "CSS", "JavaScript", "Python", "Java", "C#", "C++", "PHP", "JSON", "API"];

  filters.forEach(filter => {
    const button = document.createElement("button");
    button.textContent = filter;

    button.addEventListener("click", () => {
      document.querySelectorAll(".filters button").forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");

      if (button.textContent === "All") {
        displayProjects(allProjects);
      } else {
        const filtered = allProjects.filter(project => project.stack.includes(button.textContent));

        displayProjects(filtered);

        if (filtered.length === 0) {
          document.querySelector(".projects").innerHTML = "coming soon...";
        }
      }
    })


    container.appendChild(button);
  });
}
//#endregion



//#region Display Projects
function displayProjects(projectsList) {
  const container = document.querySelector(".projects");
  container.innerHTML = "";

  projectsList.forEach(project => {
    // Card
    const card = document.createElement("div");
    card.classList.add("project-card");



    // Img container
    const preview = document.createElement("div");
    preview.classList.add("project-preview");

    // Badge if project is earlier
    if (project.earlier) {
      const badge = document.createElement("span");
      badge.classList.add("badge");
      badge.textContent = "Earlier Project";
      preview.appendChild(badge);
    }

    // Img and its properties
    const img = document.createElement("img");
    img.src = `images/${project.image}.webp`;
    img.alt = `${project.name}`;
    img.loading = `lazy`;
    preview.appendChild(img);



    // Project Content Container
    const content = document.createElement("div");
    content.classList.add("project-content");

    // Project name
    const name = document.createElement("h2");
    name.innerHTML = `${project.name}`;
    content.appendChild(name);

    // Project stack
    const stacks = document.createElement("div");
    stacks.classList.add("stack");
    project.stack.forEach(stack => {
      const stackName = document.createElement("span");
      stackName.innerHTML = stack;
      stacks.appendChild(stackName);
    });
    content.appendChild(stacks);

    // Project description
    const description = document.createElement("p");
    description.innerHTML = `${project.description}`;
    content.appendChild(description);

    // Project links
    const links = document.createElement("div");
    links.classList.add("project-links");
    for (const text in project.links) {
      const link = document.createElement("a");
      link.href = `${project.links[text]}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = `${text}`;
      links.appendChild(link);
    }
    content.appendChild(links);



    // Create dialog
    const modalButton = document.createElement("button");
    modalButton.textContent = "Details";
    modalButton.addEventListener("click", (e) => {
      e.preventDefault();
      createModal(project);
    })
    content.appendChild(modalButton);



    card.appendChild(preview);
    card.appendChild(content);
    container.appendChild(card);
  });
}
//#endregion



//#region Create Modal
function createModal(project) {
  const existing = document.getElementById("modal");
  if (existing) existing.remove();

  // Create Modal
  const modal = document.createElement("dialog");
  modal.classList.add("modal");


  // Create Modal Content Container
  const content = document.createElement("div");
  content.classList.add("modal-content");


  // Create Modal Header
  const header = document.createElement("div");
  header.classList.add("modal-header");
  header.innerHTML = `
    <h2>${project.name}</h2>
    <p>${project.details.tagline}</p>
  `;
  content.appendChild(header);
  // Create Modal Image
  const hero = document.createElement("div");
  hero.classList.add("modal-hero");
  hero.innerHTML = `
    <img src="images/${project.image}.webp" alt="${project.name} Preview" loading="lazy">
  `;
  content.appendChild(hero);


  //#region Create Modal Body Section
  const body = document.createElement("div");
  body.classList.add("modal-body");

  //#region Create Modal Main Left Section
  const main = document.createElement("div");
  main.classList.add("modal-main");


  // Problem / Goal
  const goal = document.createElement("div");
  goal.innerHTML = `
    <h3>Problem / Goal</h3>
    <p>
      ${project.details.problem}
    </p>
  `;
  main.appendChild(goal);


  // Key Features
  const features = document.createElement("div");

  const featuresTitle = document.createElement("h3");
  featuresTitle.innerHTML = `Key Features`;
  features.appendChild(featuresTitle);

  const list = document.createElement("ul");
  project.details.features.forEach(features => {
    const item = document.createElement("li");
    item.innerHTML = `${features}`;
    list.appendChild(item);
  });
  features.appendChild(list);
  main.appendChild(features);


  // Challenges & Solutions
  const challenge = document.createElement("div");
  challenge.innerHTML = `
    <h3>Challenges & Solutions</h3>
    <p>
      ${project.details.challenges}
    </p>
  `;
  main.appendChild(challenge);


  // What I Learned
  const learned = document.createElement("div");
  learned.innerHTML = `
    <h3>What I Learned</h3>
    <p>
      ${project.details.learning}
    </p>
  `;
  main.appendChild(learned);


  body.appendChild(main);
  //#endregion


  //#region Create Modal Sidebar Right Section
  const sidebar = document.createElement("div");
  sidebar.classList.add("modal-sidebar");



  // Stack
  const stack = document.createElement("div");

  const stackTitle = document.createElement("h3");
  stackTitle.innerHTML = `Stack`;
  stack.appendChild(stackTitle);

  const stackList = document.createElement("ul");
  project.stack.forEach(stack => {
    const stackItem = document.createElement("li");
    stackItem.innerHTML = `${stack}`;
    stackList.appendChild(stackItem);
  });
  stack.appendChild(stackList);
  sidebar.appendChild(stack);


  // Links
  const links = document.createElement("div");

  const linksTitle = document.createElement("h3");
  linksTitle.innerHTML = `Links`;
  links.appendChild(linksTitle);

  const linkList = document.createElement("ul");

  for (const text in project.links) {
    const url = document.createElement("li");
    url.innerHTML = `
      <a href="${project.links[text]}" target="_blank" rel="noopener noreferrer">${text}</a>
    `;
    linkList.appendChild(url);
  }
  links.appendChild(linkList);
  sidebar.appendChild(links);


  body.appendChild(sidebar);
  //#endregion


  //#region Create Close Dialoge button
  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
  closeBtn.addEventListener("click", () => {
    modal.close();
  });
  content.appendChild(closeBtn);
  //#endregion

  //#endregion


  content.appendChild(body);
  modal.appendChild(content);
  document.body.appendChild(modal);
  modal.showModal();
}
//#endregion


