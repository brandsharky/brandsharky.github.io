import { loaderFadeOut, toggleLightMode, toggleHamburgerMenu, createStars } from "./functions.js";
import { getProjects } from "./projectData.js";



//#region Loader Fade Out, Darkmode/Lightmode Toggle, Hamburger Menu
document.addEventListener("DOMContentLoaded", async() => {
  createStars();

  loaderFadeOut();
  toggleLightMode();
  toggleHamburgerMenu();

  createProjectDetails(await getProjects());
});
//#endregion



//#region Populate Project Details Container
function createProjectDetails(projectData) {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");
  const project = projectData.find((project) => project.image === projectId);

  const container = document.getElementById("project-details");
  if (!project) {
    container.innerHTML = `<p>Project not found.</p><a href="projects.html">Back to Projects Page</a>`;
    return;
  }
  container.innerHTML = `
  <div class="details-header">
    <h2>${project.name}</h2>
    <p>${project.details.tagline}</p>
  </div>


  <div class="details-hero">
    <img src="images/${project.image}.webp" alt="${project.name} Preview" loading="lazy">

    <div class="sidebar">
      <div>
        <h3>Stack</h3>
        <ul>
          ${project.stack.map((stackItem) => `<li>${stackItem}</li>`).join("")}
        </ul>
      </div>

      <div>
        <h3>Links</h3>
        <ul>
          ${Object.entries(project.links).map(([name, url]) => url
            ? `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a></li>`
            : `<li>Coming Soon</li>`
          ).join("")}
        </ul>
      </div>
    </div>
  </div>


  <div class="details-body">
    <div>
      <h3>Problem / Goal</h3>
      <p>
        ${project.details.problem}
      </p>
    </div>

    <div>
      <h3>Key Features</h3>
      <ul>
        ${project.details.features.map((feature) => `<li>${feature}</li>`).join("")}
      </ul>
    </div>

    <div>
      <h3>Challenges & Solutions</h3>
      <p>
        ${project.details.challenges}
      </p>
    </div>

    <div>
      <h3>What I Learned</h3>
      <p>
        ${project.details.learning}
      </p>
    </div>
  </div>


  <a href="projects.html">Back to Projects Page</a>
  `;
}
//#endregion
