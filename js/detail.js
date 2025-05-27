document.addEventListener("DOMContentLoaded", () => {

    const currentDateEl = document.getElementById("current-date");

    const today = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = today.toLocaleDateString("en-GB", options);

    currentDateEl.textContent = formattedDate;

    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const dropdown = document.getElementById("dropdown_projects");
    const hookSizeDisplay = document.getElementById("hook-size");
    const timeInput = document.getElementById("time-crocheted");
    const saveBtn = document.getElementById("finished_btn");

    
    if (savedProjects.length > 0) {
        savedProjects.forEach((project, index) => {
            const option = document.createElement("option");
            option.value = index; 
            option.text = project.name;
            dropdown.add(option);
        });
    } else {
        const emptyOption = document.createElement("option");
        emptyOption.text = "Geen project gevonden";
        dropdown.add(emptyOption);
    }

    dropdown.addEventListener("change", function () {
        const selectedIndex = this.value;
        if (selectedIndex !== "") {
            const selectedProject = savedProjects[selectedIndex];
            hookSizeDisplay.textContent = `Hook size (mm): ${selectedProject.hookSize}`;
        } else {
            hookSizeDisplay.textContent = "Hook size (mm):";
        }
    });

    saveBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const selectedIndex = dropdown.value;
        const timeSpent = timeInput.value.trim();
        const today = new Date().toISOString().split("T")[0]; // Automatische datum: "2025-02-01"

        if (selectedIndex === "" || !timeSpent) {
            alert("Selecteer een project en vul tijd in.");
            return;
        }

        const selectedProject = savedProjects[selectedIndex];
        const newLog = {
            date: today,
            projectName: selectedProject.name,
            time: timeSpent
        };

        const logs = JSON.parse(localStorage.getItem("logs")) || [];
        logs.push(newLog);
        localStorage.setItem("logs", JSON.stringify(logs));

        alert("Tijd succesvol opgeslagen!");
        console.log("Saved log:", newLog);
    });
});
