import { loaderFadeOut, toggleLightMode, toggleHamburgerMenu, createStars } from "./functions.js";
import { getProjects } from "./projectData.js";



let allProjects = [];
//#region Loader Fade Out, Darkmode/Lightmode Toggle, Hamburger Menu
document.addEventListener("DOMContentLoaded", async() => {
  createStars();

  loaderFadeOut();
  toggleLightMode();
  toggleHamburgerMenu();

  allProjects = await getProjects();
  displayProjects(allProjects);
  setupFilters();
});
//#endregion



//#region Setup Filters
function setupFilters() {
  const container = document.querySelector(".filters")
  const filters = ["All", "HTML", "CSS", "JavaScript", "EJS", "Node.js", "Express.js", "Python", "Java", "C#", "C++", "PHP", "JSON", "API", "SQL", "PostgreSQL"];

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
    // Card Link
    const card = document.createElement('a');
    card.classList.add('project-card');
    card.href = `project.html?id=${project.image}`;



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



    card.appendChild(preview);
    card.appendChild(content);
    container.appendChild(card);
  });
}
//#endregion


