"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var todoList = [];
var nextId = 1;
function addTodo() {
    var task = readlineSync.question("Enter a new task: ").trim();
    if (task === "") {
        console.log("⚠️ Task cannot be empty!");
        return;
    }
    var newTodo = { id: nextId++, task: task, completed: false };
    todoList.push(newTodo);
    console.log("\u2705 Added: \"".concat(task, "\""));
}
function removeTodo() {
    var id = readlineSync.questionInt("Enter task ID to remove: ");
    var index = todoList.findIndex(function (item) { return item.id === id; });
    if (index !== -1) {
        console.log("\uD83D\uDDD1\uFE0F Removed: \"".concat(todoList[index].task, "\""));
        todoList.splice(index, 1);
    }
    else {
        console.log("⚠️ Task not found!");
    }
}
function updateTodo() {
    var id = readlineSync.questionInt("Enter task ID to update: ");
    var todo = todoList.find(function (item) { return item.id === id; });
    if (!todo) {
        console.log("⚠️ Task not found!");
        return;
    }
    var newTask = readlineSync.question("Enter updated task: ").trim();
    if (newTask === "") {
        console.log("⚠️ Task cannot be empty!");
        return;
    }
    todo.task = newTask;
    console.log("\u270F\uFE0F Updated task #".concat(id, " to: \"").concat(newTask, "\""));
}
function completeTodo() {
    var id = readlineSync.questionInt("Enter task ID to mark as completed: ");
    var todo = todoList.find(function (item) { return item.id === id; });
    if (!todo) {
        console.log("⚠️ Task not found!");
        return;
    }
    todo.completed = true;
    console.log("\uD83C\uDF89 Marked \"".concat(todo.task, "\" as completed."));
}
function displayTodos() {
    console.log("\n📝 Current To-Do List:");
    if (todoList.length === 0) {
        console.log("No tasks yet.\n");
    }
    else {
        todoList.forEach(function (item) {
            console.log("".concat(item.id, ". [").concat(item.completed ? "✔" : " ", "] ").concat(item.task));
        });
        console.log("");
    }
}
function main() {
    while (true) {
        console.log("===== TODO LIST MENU =====");
        console.log("1. Add Task");
        console.log("2. Remove Task");
        console.log("3. Update Task");
        console.log("4. Mark as Completed");
        console.log("5. View All Tasks");
        console.log("6. Exit");
        var choice = readlineSync.questionInt("Choose an option: ");
        console.log("");
        switch (choice) {
            case 1:
                addTodo();
                break;
            case 2:
                removeTodo();
                break;
            case 3:
                updateTodo();
                break;
            case 4:
                completeTodo();
                break;
            case 5:
                displayTodos();
                break;
            case 6:
                console.log("👋 Exiting Todo List. Goodbye!");
                return;
            default:
                console.log("⚠️ Invalid choice. Try again.");
        }
        console.log("");
    }
}
main();
