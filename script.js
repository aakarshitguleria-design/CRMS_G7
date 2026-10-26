

function searchRooms() {
    const input = document.getElementById("roomSearch");
    const grid = document.getElementById("roomGrid");
    const noResults = document.getElementById("noResults");

    if (!input || !grid) return;

    const searchText = input.value.trim().toLowerCase();

    if (searchText === "") {
        grid.innerHTML = "";
        if (noResults) noResults.hidden = true;
        return;
    }

    const matches = campusRooms.filter(function (room) {
        const roomText = (
            room.name + " " +
            room.code + " " +
            room.block + " " +
            "block " + room.block + " " +
            room.facilities + " " +
            room.status
        ).toLowerCase();

        return roomText.includes(searchText);
    });

    renderRoomCards(matches, grid);

    if (noResults) {
        noResults.hidden = matches.length !== 0;
    }
}


function renderRoomCards(rooms, grid) {
    grid.innerHTML = "";

    rooms.forEach(function (room, index) {
        const card = document.createElement("article");
        card.className = "room-card";
        card.style.animationDelay = (index % 4) * 0.08 + "s";

        const statusClass = {
            Available: "status",
            Pending: "pending",
            Occupied: "occupied"
        }[room.status];

        const isCatalogue =
            document.body.dataset.page === "catalogue";

        card.innerHTML = `
            <div class="room-visual visual-${(index % 3) + 1}">
                <span>${room.name.toUpperCase()}</span>
                <h2>${String(index + 1).padStart(2, "0")}</h2>
            </div>

            <div class="room-info">
                <p class="room-number">
                    BLOCK ${room.block} / ${room.code}
                </p>

                <h3>${room.name}</h3>
                <p>Capacity: ${room.capacity} people</p>
                <p>${room.facilities}</p>

                ${isCatalogue ? "" : `
                    <div class="room-footer">
                        <span class="${statusClass}">
                            ${room.status}
                        </span>

                        <button type="button" class="room-action">
                            ${room.status === "Available"
                                ? "Book →"
                                : "Check Status →"}
                        </button>
                    </div>
                `}
            </div>
        `;

        const button = card.querySelector(".room-action");

        if (button) {
            button.addEventListener("click", function () {
                if (room.status === "Available") {
                    bookRoom(room.name, true);
                    showBookingForm(room);
                } else {
                    bookRoom(room.name, false);
                }
            });
        }

        grid.appendChild(card);
    });
}





// Search when Enter is pressed
document.addEventListener("DOMContentLoaded", function () {
    const grid = document.getElementById("roomGrid");

    // Catalogue: show every room when the page opens.
    if (grid && grid.hasAttribute("data-all-rooms")) {
        renderRoomCards(campusRooms, grid);
    }
    renderBookingRequests();
    renderAdminRequests();
    const approvedContainer = document.getElementById(
    "approvedBookingsContainer"
    );

    if (approvedContainer) {
        renderApprovedBookings();
        setInterval(renderApprovedBookings, 60000);
    }
});

function showNotification(message, isAvailable) {
    let toast = document.getElementById("roomToast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "roomToast";
        toast.className = "room-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }

    toast.className = "room-toast " +
        (isAvailable ? "toast-success" : "toast-error");

    toast.textContent = message;

    // Restart the entrance animation
    toast.classList.remove("toast-show");
    void toast.offsetWidth;
    toast.classList.add("toast-show");

    clearTimeout(window.roomToastTimer);

    window.roomToastTimer = setTimeout(function () {
        toast.classList.remove("toast-show");
    }, 3500);
}


function bookRoom(roomName, isAvailable) {
    const room = campusRooms.find(function (item) {
        return item.name === roomName;
    });

    if (!room) return;

    if (room.status === "Available") {
        showNotification(
            roomName + " is available! You can proceed with booking.",
            true
        );
    } else if (room.status === "Pending") {
        showNotification(
            roomName + " has a pending request. Please check its booking status.",
            false
        );
    } else {
        showNotification(
            roomName + " is currently occupied. Please choose another room.",
            false
        );
    }
}


/* ===== NAVIGATION MENU CONTROL ===== */

document.addEventListener("DOMContentLoaded", function () {
    const trigger = document.getElementById("menuTrigger");

    if (!trigger) return;

    trigger.addEventListener("click", function () {
        const isOpen = document.body.classList.toggle("menu-open");
        trigger.setAttribute("aria-expanded", String(isOpen));
        trigger.textContent = isOpen ? "✕ CLOSE" : "☰ MENU";
    });

    // Close the menu after a navigation link is selected
    document.querySelectorAll(".sidebar nav a").forEach(function (link) {
        link.addEventListener("click", function () {
            document.body.classList.remove("menu-open");
            trigger.setAttribute("aria-expanded", "false");
            trigger.textContent = "☰ MENU";
        });
    });
});

/* ===== COMPLETE ROOM CATALOGUE ===== */

const campusRooms = [
    { name: "Lecture Hall", code: "A-101", block: "A", capacity: 80, status: "Available", facilities: "Projector · Whiteboard" },
    { name: "Computer Lab", code: "B-204", block: "B", capacity: 40, status: "Available", facilities: "Computers · Wi-Fi" },
    { name: "Meeting Room", code: "C-105", block: "C", capacity: 12, status: "Occupied", facilities: "Display · Conference table" },
    { name: "Seminar Hall", code: "A-102", block: "A", capacity: 60, status: "Available", facilities: "Projector · Audio system" },
    { name: "Physics Lab", code: "B-105", block: "B", capacity: 30, status: "Occupied", facilities: "Lab equipment · Safety kits" },
    { name: "Chemistry Lab", code: "B-106", block: "B", capacity: 30, status: "Pending", facilities: "Lab benches · Ventilation" },
    { name: "Tutorial Room", code: "A-201", block: "A", capacity: 25, status: "Available", facilities: "Whiteboard · Seating" },
    { name: "Conference Room", code: "C-201", block: "C", capacity: 16, status: "Pending", facilities: "Display · Video conferencing" },
    { name: "Design Studio", code: "D-101", block: "D", capacity: 24, status: "Available", facilities: "Drawing boards · Wi-Fi" },
    { name: "Project Lab", code: "D-102", block: "D", capacity: 35, status: "Occupied", facilities: "Workstations · Power outlets" },
    { name: "Lecture Room 2", code: "A-202", block: "A", capacity: 50, status: "Available", facilities: "Projector · Whiteboard" },
    { name: "Computer Lab 2", code: "B-205", block: "B", capacity: 45, status: "Pending", facilities: "Computers · Wi-Fi" },
    { name: "Innovation Hub", code: "D-201", block: "D", capacity: 20, status: "Available", facilities: "Flexible seating · Display" },
    { name: "Library Study Room", code: "C-301", block: "C", capacity: 10, status: "Occupied", facilities: "Study tables · Wi-Fi" },
    { name: "Training Room", code: "A-301", block: "A", capacity: 35, status: "Available", facilities: "Projector · Audio system" },
    { name: "Workshop Room", code: "D-202", block: "D", capacity: 28, status: "Occupied", facilities: "Work benches · Equipment" }
];



/* ===== LIVE ADMIN BOOKING REQUESTS ===== */

function renderAdminRequests() {
    const container = document.getElementById(
        "adminRequestsContainer"
    );
    const emptyMessage = document.getElementById(
        "emptyAdminMessage"
    );

    // Only run on the Admin Management page.
    if (!container || !emptyMessage) return;

    const requests = JSON.parse(
        localStorage.getItem("campusBookingRequests") || "[]"
    );

    container.innerHTML = "";

    const pendingRequests = requests.filter(function (request) {
        return !request.status || request.status === "Pending";
    });

    emptyMessage.hidden = requests.length > 0;

    if (requests.length > 0 && pendingRequests.length === 0) {
        emptyMessage.textContent =
            "No requests are awaiting approval. All submitted requests have been reviewed.";
        emptyMessage.hidden = false;
    } else {
        emptyMessage.textContent =
            "No booking requests have been submitted yet.";
    }

    pendingRequests.forEach(function (request) {
        const row = document.createElement("div");
        row.className = "schedule-row admin-request";

        const details = document.createElement("div");
        details.style.flex = "1";

        const heading = document.createElement("h3");
        heading.textContent =
            (request.id || "Booking Request") + " · " +
            (request.roomName || "Room") + " — " +
            (request.roomCode || "");

        const student = document.createElement("p");
        student.textContent =
            "Requested by: " + (request.fullName || "Unknown");

        const dateTime = document.createElement("p");
        dateTime.textContent =
            "Date: " + (request.date || "Not specified") +
            " · Time: " +
            (request.startTime || "--") +
            "–" +
            (request.endTime || "--");

        const purpose = document.createElement("p");
        purpose.textContent =
            "Purpose: " + (request.purpose || "Not specified");

        details.appendChild(heading);
        details.appendChild(student);
        details.appendChild(dateTime);
        details.appendChild(purpose);

        const status = document.createElement("span");
        status.className = "pending request-status";
        status.textContent = request.status || "Pending";

        const approveButton = document.createElement("button");
        approveButton.className = "button admin-action";
        approveButton.textContent = "Approve";
        approveButton.type = "button";

        const rejectButton = document.createElement("button");
        rejectButton.className = "button reject-button admin-action";
        rejectButton.textContent = "Reject";
        rejectButton.type = "button";

        approveButton.addEventListener("click", function () {
            updateBookingStatus(request.id, "Approved");
        });

        rejectButton.addEventListener("click", function () {
            updateBookingStatus(request.id, "Rejected");
        });

        row.appendChild(details);
        row.appendChild(status);
        row.appendChild(approveButton);
        row.appendChild(rejectButton);

        container.appendChild(row);
    });
}

function updateBookingStatus(requestId, newStatus) {
    const requests = JSON.parse(
        localStorage.getItem("campusBookingRequests") || "[]"
    );

    const request = requests.find(function (item) {
        return item.id === requestId;
    });

    if (!request || request.status !== "Pending") {
        showNotification(
            "This request has already been reviewed or could not be found.",
            false
        );
        renderAdminRequests();
        return;
    }

    request.status = newStatus;

    localStorage.setItem("campusBookingRequests", JSON.stringify(requests));

    renderAdminRequests();
    renderBookingRequests();
    renderApprovedBookings();

    showNotification(
        requestId + " has been " + newStatus.toLowerCase() + ".",
        newStatus === "Approved"
    );
}

/* ===== MOBILE MENU HEIGHT ===== */

function updateMobileMenuHeight() {
    if (window.innerWidth > 700) return;

    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;

    document.body.style.setProperty(
        "--mobile-menu-height",
        sidebar.scrollHeight + "px"
    );
}

window.addEventListener("resize", updateMobileMenuHeight);
document.addEventListener("DOMContentLoaded", updateMobileMenuHeight);


function showBookingForm(room) {
    // Remove any previously opened booking form.
    const oldForm = document.getElementById("bookingModal");
    if (oldForm) oldForm.remove();

    const modal = document.createElement("div");
    modal.id = "bookingModal";
    modal.className = "booking-overlay";

    modal.innerHTML = `
        <section class="booking-form" role="dialog"
            aria-modal="true" aria-labelledby="bookingTitle">

            <button type="button" class="booking-close"
                id="closeBooking" aria-label="Close form">
                &times;
            </button>

            <p class="eyebrow">CAMPUS / SPACE</p>
            <h2 id="bookingTitle">Book ${room.name}</h2>
            <p class="booking-description">
                Room ${room.code} · Block ${room.block} ·
                Capacity ${room.capacity} people
            </p>
            <p class="booking-description">
                Fill in your details to submit a booking request.
            </p>

            <form id="roomBookingForm">
                <label for="bookingName">Full Name *</label>
                <input id="bookingName" name="fullName"
                    type="text" placeholder="Enter your full name"
                    autocomplete="name" required>

                <label for="bookingEmail">Email Address *</label>
                <input id="bookingEmail" name="email"
                    type="email" placeholder="you@example.com"
                    autocomplete="email" required>

                <label for="bookingPhone">Contact Number *</label>
                <input id="bookingPhone" name="phone"
                    type="tel" placeholder="Enter your phone number"
                    autocomplete="tel" required>

                <label for="bookingDate">Booking Date *</label>
                <input id="bookingDate" name="date"
                    type="date" required>

                <div class="booking-two-columns">
                    <div>
                        <label for="bookingStart">Start Time *</label>
                        <input id="bookingStart" name="startTime"
                            type="time" required>
                    </div>
                    <div>
                        <label for="bookingEnd">End Time *</label>
                        <input id="bookingEnd" name="endTime"
                            type="time" required>
                    </div>
                </div>

                <label for="bookingPurpose">Purpose of Booking *</label>
                <select id="bookingPurpose" name="purpose" required>
                    <option value="">Select a purpose</option>
                    <option value="Lecture">Lecture / Class</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Project">Project Work</option>
                    <option value="Event">College Event</option>
                    <option value="Other">Other</option>
                </select>

                <label for="bookingAttendees">Number of Attendees *</label>
                <input id="bookingAttendees" name="attendees"
                    type="number" min="1" max="${room.capacity}"
                    placeholder="Maximum ${room.capacity}"
                    required>

                <label for="bookingNotes">Additional Notes (Optional)</label>
                <textarea id="bookingNotes" name="notes"
                    rows="3" maxlength="500"
                    placeholder="Any special requirements?"></textarea>

                <p class="booking-error" id="bookingError"
                    role="alert" hidden></p>

                <div class="booking-actions">
                    <button type="button" class="booking-cancel"
                        id="cancelBooking">Cancel</button>
                    <button type="submit" class="booking-submit">
                        Submit Booking Request
                    </button>
                </div>
            </form>
        </section>
    `;

    document.body.appendChild(modal);

    const form = document.getElementById("roomBookingForm");
    const dateInput = document.getElementById("bookingDate");
    const startInput = document.getElementById("bookingStart");
    const endInput = document.getElementById("bookingEnd");
    const error = document.getElementById("bookingError");

    // Prevent selecting a date in the past.
    const today = new Date();
    const localToday = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    dateInput.min = localToday;

    function closeForm() {
        modal.remove();
    }

    document.getElementById("closeBooking")
        .addEventListener("click", closeForm);

    document.getElementById("cancelBooking")
        .addEventListener("click", closeForm);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) closeForm();
    });

    // Check the requested time and collect the form.
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        error.hidden = true;

        if (endInput.value <= startInput.value) {
            error.textContent =
                "End time must be later than start time.";
            error.hidden = false;
            return;
        }

        const booking = {
            roomName: room.name,
            roomCode: room.code,
            block: room.block,
            fullName: form.elements.fullName.value.trim(),
            email: form.elements.email.value.trim(),
            phone: form.elements.phone.value.trim(),
            date: dateInput.value,
            startTime: startInput.value,
            endTime: endInput.value,
            purpose: form.elements.purpose.value,
            attendees: form.elements.attendees.value,
            notes: form.elements.notes.value.trim(),
            status: "Pending"
        };

        // Demo only: show the collected request in the console.
        // Give this request a unique ID
        booking.id = "BR-" + Date.now();

        // Get previously saved requests
        const savedRequests = JSON.parse(
            localStorage.getItem("campusBookingRequests") || "[]"
        );

        // Save the new request
        savedRequests.push(booking);

        localStorage.setItem(
            "campusBookingRequests",
            JSON.stringify(savedRequests)
        );

        // Refresh the requests page if its container exists
        renderBookingRequests();

        closeForm();

        showNotification(
            "Booking request for " + room.code +
            " submitted in this demo. Approval is still pending.",
            true
        );
    });

    document.getElementById("bookingName").focus();
}

function renderBookingRequests() {
    const container = document.getElementById(
        "bookingRequestsContainer"
    );
    const emptyMessage = document.getElementById(
        "emptyRequestsMessage"
    );

    // This function only displays requests on requests.html
    if (!container || !emptyMessage) return;

    const allRequests = JSON.parse(localStorage.getItem("campusBookingRequests") || "[]");

    const requests = allRequests.filter(function (request) {
        return !request.status || request.status === "Pending";
    });

    container.innerHTML = "";

   emptyMessage.hidden = requests.length > 0;

    if (requests.length === 0) {
        emptyMessage.textContent = "No pending requests. All requests have been reviewed!";
    }

    requests.forEach(function (request) {
        const row = document.createElement("div");
        row.className = "schedule-row";

        const id = document.createElement("span");
        id.textContent = request.id || "BR-REQUEST";

        const details = document.createElement("div");

        const heading = document.createElement("h3");
        heading.textContent =
            (request.roomName || "Room") +
            " — " +
            (request.roomCode || "");

        const person = document.createElement("p");
        person.textContent =
            "Requested by: " +
            (request.fullName || "Unknown");

        const dateTime = document.createElement("p");
        dateTime.textContent =
            "Date: " + (request.date || "Not specified") +
            " · Time: " +
            (request.startTime || "--") +
            "–" +
            (request.endTime || "--");

        const purpose = document.createElement("p");
        purpose.textContent =
            "Purpose: " + (request.purpose || "Not specified");

        const attendees = document.createElement("p");
        attendees.textContent =
            "Attendees: " + (request.attendees || "Not specified");

        
        const status = document.createElement("span");

        const currentStatus = request.status || "Pending";

        if (currentStatus === "Approved") {
            status.className = "status";
        } else if (currentStatus === "Rejected") {
            status.className = "occupied";
        } else {
            status.className = "pending";
        }

        status.textContent = currentStatus;


        details.appendChild(heading);
        details.appendChild(person);
        details.appendChild(dateTime);
        details.appendChild(purpose);
        details.appendChild(attendees);

        row.appendChild(id);
        row.appendChild(details);
        row.appendChild(status);

        container.appendChild(row);
    });
}




/* ===== APPROVED BOOKINGS TIMETABLE ===== */


function renderApprovedBookings() {
    const container = document.getElementById(
        "approvedBookingsContainer"
    );

    const emptyMessage = document.getElementById(
        "emptyApprovedMessage"
    );

    // Run only on the timetable page.
    if (!container || !emptyMessage) return;

    const requests = JSON.parse(
        localStorage.getItem("campusBookingRequests") || "[]"
    );

    // Get the current date and time.
    const now = new Date();

    // Show approved bookings that have not finished yet.
    const approvedBookings = requests.filter(function (request) {
        if (request.status !== "Approved") {
            return false;
        }

        if (!request.date || !request.endTime) {
            return false;
        }

        const bookingEnd = new Date(
            request.date + "T" + request.endTime
        );

        return !isNaN(bookingEnd.getTime()) && bookingEnd > now;
    });

    container.innerHTML = "";
    emptyMessage.hidden = approvedBookings.length > 0;

    if (approvedBookings.length === 0) {
        emptyMessage.textContent = "No upcoming or ongoing approved bookings.";
    }

    approvedBookings
        .sort(function (a, b) {
            const dateA = (a.date || "") + " " + (a.startTime || "");
            const dateB = (b.date || "") + " " + (b.startTime || "");
            return dateA.localeCompare(dateB);
        })
        .forEach(function (booking) {
            const row = document.createElement("div");
            row.className = "schedule-row";

            const time = document.createElement("span");
            time.textContent =
                (booking.startTime || "--") +
                " – " +
                (booking.endTime || "--");

            const details = document.createElement("div");

            const heading = document.createElement("h3");
            heading.textContent =
                (booking.roomName || "Room") +
                " — " +
                (booking.roomCode || "");

            const date = document.createElement("p");
            date.textContent = "Date: " + (booking.date || "Not specified");

            const purpose = document.createElement("p");
            purpose.textContent =
                "Purpose: " + (booking.purpose || "Not specified");

            const requestedBy = document.createElement("p");
            requestedBy.textContent =
                "Booked by: " + (booking.fullName || "Unknown");

            const status = document.createElement("span");
            status.className = "status";
            status.textContent = "Approved";

            details.appendChild(heading);
            details.appendChild(date);
            details.appendChild(purpose);
            details.appendChild(requestedBy);

            row.appendChild(time);
            row.appendChild(details);
            row.appendChild(status);

            container.appendChild(row);
        });
}
