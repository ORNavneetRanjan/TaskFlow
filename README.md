# 📝 TaskFlow - Personal Productivity Companion

**TaskFlow** is a responsive, browser-based Todo Application built using **HTML, CSS, and Vanilla JavaScript**. It helps users manage their tasks across three key stages: **Todo**, **Completed**, and **Archived**. This project was developed as part of a front-end assignment to demonstrate skills in DOM manipulation, localStorage persistence, API integration, and responsive UI design.

🔗 **Live Demo**: [https://hitaskflow.netlify.app/index.html](https://hitaskflow.netlify.app/index.html)

---

## 📌 Features

### ✅ Landing Page (`index.html`)
- 🔒 **Age Verification**: Users must be older than 10 years to proceed.
- 🧑‍💼 **User Registration**: Form captures user's full name and date of birth.
- ✔️ **Form Validation**: Ensures all fields are filled and age requirement is met.
- 💾 **Data Persistence**: User info is stored in `localStorage` for session continuity.
- 🔁 **Auto Redirect**: Returning users are automatically redirected to the Todo App if already registered.

### ✅ Main Application (`app.html`)
- 👤 **User Profile Display**:
  - Shows user's name retrieved from localStorage.
  - Avatar image fetched from [UI Avatars API](https://ui-avatars.com/).
- ✅ **Task Management**:
  - **Three Task Stages**: Todo, Completed, Archived.
  - Dynamic counters for each stage.
  - Task cards with contextual action buttons.
  - Last modified timestamp shown in each task.
- ➕ **Add New Task**:
  - Input field to add new tasks to the selected stage.
  - Validation to prevent empty entries.
- 🔁 **Task Stage Transitions**:
  - Todo → Completed or Archived
  - Completed → Todo or Archived
  - Archived → Todo or Completed
- 🌐 **Dummy Data Integration**:
  - Fetches task data on first load from [DummyJSON Todos API](https://dummyjson.com/todos).
- 🚪 **Sign Out**:
  - Clears user data from localStorage and redirects to the registration page.

---

## 🧱 Tech Stack

- **HTML5**
- **CSS3** (Custom responsive design)
- **Vanilla JavaScript**
- **localStorage** for persistent state
- **UI Avatars API** for profile picture
- **DummyJSON API** for initial task data

---

## 🖼 Screenshots

> (Add screenshots or a screen recording here if possible to visually demonstrate your UI)

---

## 📂 Folder Structure

project-root/
│
├── assets/
│ ├── css/
│ │ └── style.css
│ │ └── app.css
│ └── js/
│ └── index.js
│ └── app.js
│
├── index.html
├── app.html
└── README.md


---

## ✅ Completed Milestones

- [x] Landing Page with age validation and user form
- [x] Form validation + localStorage handling
- [x] Auto redirect for returning users
- [x] Main Todo app UI with all three stages
- [x] Add, move, archive tasks
- [x] Display task timestamps
- [x] API integration for dummy data and avatars
- [x] Sign out functionality
- [x] Fully responsive design (Mobile, Tablet, Desktop)

---

## 🚫 Bonus Features Not Implemented

- Task search or filtering
- Animations and transitions
- Data export/import
- Keyboard shortcuts
- Task categories or priorities

---

## 📦 How to Run Locally

```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
open index.html (or use Live Server)
