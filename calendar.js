const calendarEl = document.getElementById("calendar");
const monthYearEl = document.getElementById("monthYear");
const modalEl = document.getElementById("eventModal");
let currentDate = new Date();

//Render Calendar
function renderCalendar(date = new Date()) {
    calendarEl.innerHTML = '';

    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();

    const totalDays = new Date(year, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    if (firstDayOfMonth === 0) firstDayOfMonth = 7;

    // Display the month and year
    monthYearEl.textContent = date.toLocaleDateString("en", {
        month: 'long',
        year: 'numeric'
    });

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    weekDays.forEach(day => {
        const dayEl = document.createElement("div"); // For each day, create a new div element
        dayEl.className = "day-name";
        dayEl.textContent = day;
        calendarEl.appendChild(dayEl);
    });

    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarEl.appendChild(document.createElement("div"));
    }

    // Loop through days
    for (let day = 1; day <= totalDays; day++) {
        const dateStr = `${year}-${String(month+1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const cell = document.createElement("div");
        cell.className = "day";

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            cell.classList.add("today");
        }

        const dateEl = document.createElement("div");

        dateEl.className = "date-number";
        dateEl.textContent = day;
        cell.appendChild(dateEl);

        const eventToday = events.filter(e => e.date === dateStr);
        const eventBox = document.createElement("div");
        eventBox.className = "events";

        // Render events
         eventToday.forEach(event => {
            const ev = document.createElement("div");
            ev.className = "event";

            const courseEl = document.createElement("div");
            courseEl.className = "course";
            courseEl.textContent = event.title.split(" - ")[0];

            const instructorEl = document.createElement("div");
            instructorEl.className = "instructor";
            instructorEl.textContent = "Name: " + event.title.split(" - ")[1];

            const timeEl = document.createElement("div");
            timeEl.className = "time";
            timeEl.textContent = "Time: " + event.start_time + " - " + event.end_time;

            ev.appendChild(courseEl);
            ev.appendChild(instructorEl);
            ev.appendChild(timeEl);
            eventBox.appendChild(ev);
         });

         // Overlay buttons
         
         const overlay = document.createElement("div");
         overlay.className = "day-overlay";

         const addBtn = document.createElement("button");
         addBtn.className = "overlay-btn";
         addBtn.textContent = "+ Add";

         addBtn.onclick = e => {
            e.stopPropagation();
            openModalForAdd(dateStr);
         };

        overlay.appendChild(addBtn);

        if (eventToday.length > 0) {
            const editBtn = document.createElement("button");
            editBtn.className = "overlay-btn";
            editBtn.textContent = "Edit";
            editBtn.onclick = e => {
                e.stopPropagation();
                openModalForEdit(eventToday);
            };

            overlay.appendChild(editBtn);
            }

            cell.appendChild(overlay);
            cell.appendChild(eventBox);
            calendarEl.appendChild(cell);
        }
}


// Add Event modal
function openModalForAdd(dateStr) {
    document.getElementById("formAction").value = "add";
    document.getElementById("eventId").value = "";
    document.getElementById("deleteEventId").value = "";
    document.getElementById("courseName").value = "";
    document.getElementById("instructorName").value = "";
    document.getElementById("startDate").value = dateStr;
    document.getElementById("endDate").value = dateStr;
    document.getElementById("startTime").value = "09:00";
    document.getElementById("endTime").value = "10:00";

    const selector = document.getElementById("eventSelector");
    const wrapper = document.getElementById("eventSelectorWrapper");
    if (selector && wrapper) {
        selector.innerHTML = "";
        wrapper.style.display = "none";
    }

    modalEl.style.display = "flex";
}

// Edit Event modal
function openModalForEdit(eventsOnDate) {
    document.getElementById("formAction").value = "edit";
    modalEl.style.display = "flex";

    const selector = document.getElementById("eventSelector");
    const wrapper = document.getElementById("eventSelectorWrapper");
    selector.innerHTML = "<option disabled selected>Choose event...</option>"

    eventsOnDate.forEach(e => {
        const option = document.createElement("option");
        option.value = JSON.stringify(e);
        option.textContent = `${e.title} (${e.start} -> ${e.end})`;
        selector.appendChild(option)
    });

    if (eventsOnDate.length > 1) {
        wrapper.style.display = "block";
    } else {
        wrapper.style.display = "none";
    }

    handleEventSelection(JSON.stringify(eventsOnDate[0]));
}

// Populate form from selected event
function handleEventSelection(eventJSON) {
    const event = JSON.parse(eventJSON);

    document.getElementById("eventId").value = event.id;
    document.getElementById("deleteEventId").value = event.id;

    const [course, instructor] = event.title.split(" - ").map(e => e.trim());
    document.getElementById("courseName").value = course || "";
    document.getElementById("instructorName").value = instructor || "";
    document.getElementById("startDate").value = event.start || "";
    document.getElementById("endDate").value = event.end || "";
    document.getElementById("startTime").value = event.start_time || "";
    document.getElementById("endTime").value = event.end_time || "";
}

// Close Modal
function closeModal() {
    modalEl.style.display = "none";
}

// Month navigation
function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    renderCalendar(currentDate);
}

// Live digital clock
function updateClock() {
    const now = new Date();
    const clock = document.getElementById("clock");
    clock.textContent = [
        now.getHours().toString().padStart(2, "0"),
        now.getMinutes().toString().padStart(2, "0"),
        now.getSeconds().toString().padStart(2, "0"),
    ].join(":");
}

// Initialise when ready

document.addEventListener("DOMContentLoaded", () => {
renderCalendar(currentDate);
updateClock();
setInterval(updateClock, 1000);

// Close Modal
document.getElementById("cancelButton").addEventListener("click", closeModal);
window.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
});

modalEl.addEventListener("click", e => {
    if (e.target === modalEl) closeModal();
});

// Change month
 document.getElementById("prevMonthBtn").addEventListener("click", () => {
        changeMonth(-1);
    });

document.getElementById("nextMonthBtn").addEventListener("click", () => {
        changeMonth(1);
    });

});