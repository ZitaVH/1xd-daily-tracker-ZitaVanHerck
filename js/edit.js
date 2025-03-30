document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formAdd");
    const projectNameInput = document.querySelector("#project-name");
    const hookSizeInput = document.querySelector("#hook-size");
    const saveButton = document.querySelector("#finished_btn");

    if (!form || !projectNameInput || !hookSizeInput || !saveButton) {
        console.error("One or more elements not found!");
        return;
    }

    // Laad bestaande gegevens als die er zijn
    const savedProject = JSON.parse(localStorage.getItem("project"));
    if (savedProject) {
        projectNameInput.value = savedProject.name || "";
        hookSizeInput.value = savedProject.hookSize || "";
    }

    saveButton.addEventListener("click", (e) => {
        e.preventDefault(); // Voorkomt standaard gedrag

        console.log("Save button clicked");

        const projectData = {
            name: projectNameInput.value.trim(),
            hookSize: hookSizeInput.value.trim()
        };

        if (projectData.name && projectData.hookSize) {
            localStorage.setItem("project", JSON.stringify(projectData));
            alert("Project saved successfully!");
            console.log("Saved data:", projectData);
        } else {
            alert("Please fill in all fields.");
            console.warn("Empty fields detected");
        }

        console.log("LocalStorage content:", localStorage.getItem("project"));
    });
});