document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("username").textContent =
    "Hi, " + user.name.split(" ")[0];
  document.getElementById(
    "avatar"
  ).src = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(
    user.name
  )}`;

  const taskForm = document.getElementById("taskForm");
  const newTaskInput = document.getElementById("new-task");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || {
    todo: [],
    completed: [],
    archived: [],
  };

  const renderTasks = () => {
    ["todo", "completed", "archived"].forEach((stage) => {
      const container = document.getElementById(`${stage}-tasks`);
      container.innerHTML = "";
      tasks[stage].forEach((task, idx) => {
        const card = document.createElement("div");
        card.className = "task-card";
        card.innerHTML = `
          <p>${task.text}</p>
          <small>Last modified at:<br/>${task.timestamp}</small>
          <div class="actions">
            ${getButtons(stage, idx)}
          </div>
        `;
        container.appendChild(card);
      });

      // Update tab counters
      document.getElementById(`count-${stage}`).textContent =
        tasks[stage].length;
    });
  };

  const getButtons = (stage, idx) => {
    const btns = {
      todo: `<button onclick="moveTask('todo','completed',${idx})">Mark it as completed</button>
             <button onclick="moveTask('todo','archived',${idx})">&#128465; Archive</button>`,
      completed: `<button onclick="moveTask('completed','todo',${idx})">Move to Todo</button>
                  <button onclick="moveTask('completed','archived',${idx})">&#128465; Archive</button>`,
      archived: `<button onclick="moveTask('archived','todo',${idx})">Move to Todo</button>
                 <button onclick="moveTask('archived','completed',${idx})">Move to Completed</button>`,
    };
    return btns[stage];
  };

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = newTaskInput.value.trim();
    if (!taskText) {
      showToast("Cannot add empty Task", "Please enter a valid text.");
      return;
    }
    tasks.todo.push({ text: taskText, timestamp: formatTimestamp() });
    showToast(
      "Added Task suceesfully",
      "Task " + "'" + taskText + "' has been added."
    );
    newTaskInput.value = "";
    saveTasks();
  });

  window.moveTask = (from, to, idx) => {
    const task = tasks[from][idx];
    task.timestamp = formatTimestamp();
    tasks[to].push(task);
    tasks[from].splice(idx, 1);
    saveTasks();

    const actionMap = {
      todo: "Todo",
      completed: "Completed",
      archived: "Archived",
    };
    showToast("Task Updated", `Task moved to ${actionMap[to]}.`);
  };

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  };

  document.getElementById("signout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(".task-section")
        .forEach((s) => s.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  if (!localStorage.getItem("initialized")) {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((data) => {
        tasks.todo = data.todos.slice(0, 5).map((todo) => ({
          text: todo.todo,
          timestamp: formatTimestamp(),
        }));
        localStorage.setItem("initialized", true);
        saveTasks();
      });
  } else {
    renderTasks();
  }

  // Toast function
  function showToast(title, message) {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
});
