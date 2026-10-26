# CRMS_repo
The Campus Room Management System Front-End 

## Project Overview

The Campus Room Management System is a front-end web application designed to simplify the process of exploring, requesting, and managing campus rooms. It helps users view room details, check availability, submit booking requests, and track their booking status in one place.

This project is a prototype built using HTML, CSS, and JavaScript. It uses browser `localStorage` to save booking requests without requiring a backend server or database.

## Features

- **Sidebar navigation** for Home, Room Catalogue, Availability, Timetable, Booking Requests, and Admin Management.
- **Room Catalogue** displaying room names, room codes, building blocks, seating capacities, facilities, and availability statuses.
- **Room search** to find rooms by name, code, block, facilities, or status.
- **Booking request form** for entering personal details, booking date, time, purpose, and number of attendees.
- **Booking status management** with Pending, Approved, and Rejected statuses.
- **Admin Management** page allowing administrators to approve or reject booking requests.
- **Dynamic Booking Requests page** displaying requests awaiting an administrative response.
- **Dynamic Timetable** displaying approved bookings that have not yet passed their end time.
- **Automatic timetable updates** that hide completed bookings while retaining their stored data.
- **Browser-based data persistence** using `localStorage`.
- **Notification messages** providing feedback when users submit requests or administrators review them.
- **Responsive and consistent interface** with a dark-themed colour scheme.

## Technologies Used

- **HTML** — page structure, navigation, forms, and content.
- **CSS** — colours, layouts, room cards, buttons, status labels, and visual styling.
- **JavaScript** — room search, dynamic rendering, booking forms, status updates, filtering, and notifications.
- **Browser localStorage** — saving and retrieving booking information across page refreshes within the same browser and website origin.

## Colour Palette

| Colour | Hex Code |
|---|---|
| Primary — Dark Plum | `#3A0F34` |
| Secondary — Light Grey | `#DDE3E8` |
| Accent — Golden Yellow | `#EAAA00` |
| White | `#FFFFFF` |
| Text — Dark Purple | `#261B28` |
| Muted Grey | `#77717A` |

## How to Run

1. Download or clone the project repository.
2. Open the project folder in Visual Studio Code.
3. Ensure that the HTML files, `style.css`, and `script.js` are in the correct locations.
4. Open `index.html` in a browser, or use the VS Code Live Server extension.
5. Navigate to the Room Catalogue and submit a booking request.
6. Open Admin Management to approve or reject the request.
7. Visit the Timetable to view approved bookings.

**Important:** Use the same browser and website origin when testing the booking workflow, because the application stores data in `localStorage`.

## Important Limitations

- Room information is predefined sample data in JavaScript.
- Booking requests are stored locally in the browser.
- There is no backend server or shared database.
- There is no real user authentication or role-based access control.
- Admin actions are demonstration features and are not protected by login permissions.
- Data is not automatically synchronized across different browsers or devices.
- Completed bookings are hidden from the timetable but remain in `localStorage`.
- The system does not yet prevent overlapping bookings for the same room.
- Availability statuses are demonstration data and are not fully synchronized with every booking.

## Possible Future Improvements

- Integrate a backend and database for centralized booking management.
- Add secure login and role-based access for students and administrators.
- Prevent duplicate and overlapping room bookings.
- Synchronize room availability with approved bookings.
- Add booking history and options to archive or delete old records.
- Send booking confirmation and rejection notifications.
- Add filters for dates, room types, blocks, and capacities.
- Improve accessibility and mobile responsiveness.

## Project Goal

The goal of the Campus Room Management System is to demonstrate how campus room scheduling can be organized through an interactive web interface. It provides a practical example of front-end development, dynamic content rendering, form validation, administrative workflows, and browser-based data storage using HTML, CSS, and JavaScript.
