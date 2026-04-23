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
    for (let i = 0; i < project.links.length; i++) {
      const link = document.createElement("a");
      link.href = `${project.links[i]}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = `${project.linkContent[i]}`;
      links.appendChild(link);
    }
    content.appendChild(links);




    // Create dialog












    card.appendChild(preview);
    card.appendChild(content);
    container.appendChild(card);
  });
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


