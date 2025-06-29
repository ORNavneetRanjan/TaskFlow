document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("username").textContent = user.name;
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
          <small>${task.timestamp}</small>
          <div class="actions">
            ${getButtons(stage, idx)}
          </div>
        `;
        container.appendChild(card);
      });
    });
  };

  const getButtons = (stage, idx) => {
    const timestamp = formatTimestamp();
    const btns = {
      todo: `<button onclick="moveTask('todo','completed',${idx})">Mark as Completed</button>
             <button onclick="moveTask('todo','archived',${idx})">Archive</button>`,
      completed: `<button onclick="moveTask('completed','todo',${idx})">Move to Todo</button>
                  <button onclick="moveTask('completed','archived',${idx})">Archive</button>`,
      archived: `<button onclick="moveTask('archived','todo',${idx})">Move to Todo</button>
                <button onclick="moveTask('archived','completed',${idx})">Move to Completed</button>`,
    };
    return btns[stage];
  };

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = newTaskInput.value.trim();
    if (!taskText) return;
    tasks.todo.push({ text: taskText, timestamp: formatTimestamp() });
    newTaskInput.value = "";
    saveTasks();
  });

  window.moveTask = (from, to, idx) => {
    const task = tasks[from][idx];
    task.timestamp = formatTimestamp();
    tasks[to].push(task);
    tasks[from].splice(idx, 1);
    saveTasks();
  };

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  };

  document.getElementById("signout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
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
});
