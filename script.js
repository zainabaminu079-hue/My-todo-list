document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // 1. Load existing items out of localStorage memory array on setup
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const saveToStorage = () => {
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = "";
        savedTasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = `task-item ${task.completed ? 'completed' : ''}`;

            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <button class="delete-btn">🗑️</button>
            `;

            // Toggle complete state when clicking the item string
            li.querySelector(".task-text").addEventListener("click", () => {
                savedTasks[index].completed = !savedTasks[index].completed;
                saveToStorage();
                renderTasks();
            });

            // Handle deletion action clicking dumpster element
            li.querySelector(".delete-btn").addEventListener("click", () => {
                savedTasks.splice(index, 1);
                saveToStorage();
                renderTasks();
            });

            taskList.appendChild(li);
        });
    };

    // Add entry callback function helper logic
    const handleAddTask = () => {
        const textValue = taskInput.value.trim();
        if (textValue === "") return;

        savedTasks.push({ text: textValue, completed: false });
        taskInput.value = "";
        saveToStorage();
        renderTasks();
    };

    addTaskBtn.addEventListener("click", handleAddTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleAddTask();
    });

    // Run initial visualization loop on load
    renderTasks();
});

