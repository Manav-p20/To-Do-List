// Access DOM elements
const taskInput = document.getElementById('taskInput'); // Input field for new tasks
const addButton = document.getElementById('addButton'); // Button to add new tasks
const taskList = document.getElementById('taskList'); // UL element to display the list of tasks

// Load tasks from local storage when the document is loaded
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event listeners
addButton.addEventListener('click', addTask); // Add task on button click
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask(); // Add task when 'Enter' key is pressed
    }
});

function addTask() {
    const taskText = taskInput.value.trim(); // Get the trimmed input value
    if (taskText === '') {
        alert('Task cannot be empty!'); // Alert if the task text is empty
        return;
    }

    // Create task element
    const taskItem = document.createElement('li'); // Create a new list item
    taskItem.className = 'task-item'; // Set class for styling
    taskItem.innerHTML = `
        <input type="checkbox"> <!-- Checkbox to mark task as completed -->
        <span>${taskText}</span> <!-- Task text -->
        <button onclick="deleteTask(this)">Delete</button> <!-- Button to delete the task -->
    `;
    taskList.appendChild(taskItem); // Add the new task to the task list

    // Save task to local storage
    saveTasks(); // Update local storage with the new task
    taskInput.value = ''; // Clear the input field
}

function deleteTask(button) {
    button.parentElement.remove(); // Remove the task item from the DOM
    saveTasks(); // Update local storage after deletion
}

function saveTasks() {
    const tasks = []; // Array to hold task data
    taskList.querySelectorAll('.task-item').forEach(item => {
        tasks.push({
            text: item.querySelector('span').textContent, // Get task text
            checked: item.querySelector('input[type="checkbox"]').checked // Get checkbox status
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to local storage
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get tasks from local storage or use empty array
    tasks.forEach(task => {
        const taskItem = document.createElement('li'); // Create a new list item
        taskItem.className = 'task-item'; // Set class for styling
        taskItem.innerHTML = `
            <input type="checkbox" ${task.checked ? 'checked' : ''}> <!-- Checkbox with status -->
            <span>${task.text}</span> <!-- Task text -->
            <button onclick="deleteTask(this)">Delete</button> <!-- Button to delete the task -->
        `;
        taskList.appendChild(taskItem); // Add the task to the task list
    });
}
