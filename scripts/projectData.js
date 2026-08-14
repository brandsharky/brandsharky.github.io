//#region JSON fetch
export async function getProjects() {
  try {
    const response = await fetch("data/projects.json");

    if (!response.ok) {
      throw Error(await response.text());
    }

    const data = await response.json();
    return data.projects;
  } catch (err) {
    console.error("Error loading projects:", err);
    return [];
  }
}
//#endregion