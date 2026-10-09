// DOM Elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage when app starts
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks to the screen
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span class="task-text" onclick="toggleComplete(${index})">${task.text}</span>
            <div class="actions">
                <button onclick="toggleComplete(${index})">${task.completed ? '↩️' : '✅'}</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;
        taskList.appendChild(li);
    });
    saveToLocalStorage();
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    tasks.push({ text: text, completed: false });
    taskInput.value = '';
    renderTasks();
}

// Toggle complete status
window.toggleComplete = function(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
};

// Delete a task
window.deleteTask = function(index) {
    tasks.splice(index, 1);
    renderTasks();
};

// Save current tasks array to localStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial run
renderTasks();

