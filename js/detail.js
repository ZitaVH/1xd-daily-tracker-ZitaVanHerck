document.addEventListener("DOMContentLoaded", () => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const dropdown = document.getElementById("dropdown_projects");

    if (savedProjects.length > 0) {
        savedProjects.forEach((project, index) => {
            const option = document.createElement("option");
            option.value = index; // Gebruik index als value
            option.text = project.name; // Naam van het project
            dropdown.add(option);
        });
    } else {
        const emptyOption = document.createElement("option");
        emptyOption.text = "Geen project gevonden";
        dropdown.add(emptyOption);
    }

    dropdown.addEventListener("change", function() {
        const selectedIndex = this.value;
        if (selectedIndex !== "") {
            const selectedProject = savedProjects[selectedIndex];
            document.getElementById("project-name").textContent = selectedProject.name;
            document.getElementById("hook-size").textContent = `Hook size (mm): ${selectedProject.hookSize}`;
        } else {
            document.getElementById("project-name").textContent = "Project name";
            document.getElementById("hook-size").textContent = "Hook size (mm):";
        }
    });
});