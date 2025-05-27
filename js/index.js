document.addEventListener("DOMContentLoaded", () => {
    const currentDateEl = document.getElementById("current-date"); // H2 voor maand + jaar titel boven kalender
    const calendarBody = document.getElementById("calendar-body");
    const projectsContainer = document.querySelector(".current_project");
    const streakCountEl = document.getElementById("streak-count");

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    function toDateString(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    
    function renderCalendar(month, year) {
        
        const options = { year: "numeric", month: "long" };
        currentDateEl.textContent = new Date(year, month).toLocaleDateString("en-GB", options);

        
        calendarBody.innerHTML = "";

        // Eerste dag van de maand (maandag = 0, zondag = 6)
        let firstDay = new Date(year, month, 1).getDay();
        firstDay = (firstDay + 6) % 7;

        
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        // Logs ophalen
        const logs = JSON.parse(localStorage.getItem("logs")) || [];
        const loggedDates = new Set(
            logs
                .filter(log => {
                    const d = new Date(log.date);
                    return d.getMonth() === month && d.getFullYear() === year;
                })
                .map(log => toDateString(log.date))
        );

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");

                if (i === 0 && j < firstDay) {
                    cell.classList.add("other_month");
                    cell.textContent = "";
                } else if (date > daysInMonth) {
                    cell.classList.add("other_month");
                    cell.textContent = "";
                } else {
                    cell.textContent = date;

                    // Check of dag gelogd is en kleur cel
                    const dateStr = toDateString(new Date(year, month, date));
                    if (loggedDates.has(dateStr)) {
                        cell.style.backgroundColor = "#fec9fc";
                        cell.title = "Je hebt hier gehaakt!";
                    }

                    date++;
                }

                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    }

    function calculateStreak(logs) {
        if (!logs.length) return 0;

        const dates = logs
            .map(log => log.date)
            .filter((v, i, a) => a.indexOf(v) === i)
            .sort((a, b) => new Date(b) - new Date(a));

        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0,0,0,0);

        for (const dateStr of dates) {
            const logDate = new Date(dateStr);
            logDate.setHours(0,0,0,0);

            const diffTime = currentDate - logDate;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);

            if (diffDays === streak) {
                streak++;
            } else if (diffDays > streak) {
                break;
            }
        }
        return streak;
    }

    renderCalendar(currentMonth, currentYear);

    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    if (savedProjects.length > 0) {
        projectsContainer.innerHTML = ""; // Reset container

        savedProjects.forEach(project => {
            const p = document.createElement("p");

            const a = document.createElement("a");
            a.href = "detail.html";
            a.textContent = project.name;
            a.style.backgroundColor = "#fec9fc";
            a.style.padding = "2px 6px";
            a.style.borderRadius = "12px";
            a.style.marginRight = "8px";
            a.style.textDecoration = "none";
            a.style.color = "black";

            const span = document.createElement("span");
            span.textContent = `(Hook size: ${project.hookSize})`;

            p.appendChild(a);
            p.appendChild(span);
            projectsContainer.appendChild(p);
        });
    } else {
        projectsContainer.textContent = "Geen projecten gevonden.";
    }

    const logs = JSON.parse(localStorage.getItem("logs")) || [];
    const streakCount = calculateStreak(logs);
    streakCountEl.textContent = streakCount;
});
