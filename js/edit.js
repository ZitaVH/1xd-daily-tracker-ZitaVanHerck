document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formAdd");
    const projectNameInput = document.querySelector("#project-name");
    const hookSizeInput = document.querySelector("#hook-size");
    const saveButton = document.querySelector("#finished_btn");

    if (!form || !projectNameInput || !hookSizeInput || !saveButton) {
        console.error("One or more elements not found!");
        return;
    }

    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    if (savedProjects.length > 0) {
        const savedProject = savedProjects[0]; 
        projectNameInput.value = savedProject.name || "";
        hookSizeInput.value = savedProject.hookSize || "";
    }

    saveButton.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Save button clicked");

        const projectData = {
            name: projectNameInput.value.trim(),
            hookSize: hookSizeInput.value.trim()
        };

        if (projectData.name && projectData.hookSize) {
            const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
            savedProjects[0] = projectData;
            localStorage.setItem("projects", JSON.stringify(savedProjects));
            alert("Project saved successfully!");
            console.log("Saved data:", projectData);
        } else {
            alert("Please fill in all fields.");
            console.warn("Empty fields detected");
        }

        console.log("LocalStorage content:", localStorage.getItem("projects"));
    });
});
