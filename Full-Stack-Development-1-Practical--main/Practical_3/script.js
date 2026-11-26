
function addTask() {

    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");

    // Create checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.onchange = function() {
        taskText.classList.toggle("completed");
    };

    // Create task text
    let taskText = document.createElement("span");
    taskText.textContent = task;
    taskText.className = "task-text";

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";

    deleteBtn.onclick = function() {
        li.remove();
    };

    // Move Up button
    let upBtn = document.createElement("button");
    upBtn.textContent = "↑";
    upBtn.className = "move";

    upBtn.onclick = function() {
        let previous = li.previousElementSibling;

        if (previous) {
            li.parentNode.insertBefore(li, previous);
        }
    };

    // Move Down button
    let downBtn = document.createElement("button");
    downBtn.textContent = "↓";
    downBtn.className = "move";

    downBtn.onclick = function() {
        let next = li.nextElementSibling;

        if (next) {
            li.parentNode.insertBefore(next, li);
        }
    };

    // Add all elements to list
    li.append(checkbox, taskText, upBtn, downBtn, deleteBtn);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}
