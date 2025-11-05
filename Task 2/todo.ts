import * as readlineSync from "readline-sync";

interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

let todoList: TodoItem[] = [];
let nextId: number = 1;

function addTodo(): void {
  const task = readlineSync.question("Enter a new task: ").trim();
  if (task === "") {
    console.log("⚠️ Task cannot be empty!");
    return;
  }
  const newTodo: TodoItem = { id: nextId++, task, completed: false };
  todoList.push(newTodo);
  console.log(`✅ Added: "${task}"`);
}

function removeTodo(): void {
  const id = readlineSync.questionInt("Enter task ID to remove: ");
  const index = todoList.findIndex(item => item.id === id);
  if (index !== -1) {
    console.log(`🗑️ Removed: "${todoList[index].task}"`);
    todoList.splice(index, 1);
  } else {
    console.log("⚠️ Task not found!");
  }
}

function updateTodo(): void {
  const id = readlineSync.questionInt("Enter task ID to update: ");
  const todo = todoList.find(item => item.id === id);
  if (!todo) {
    console.log("⚠️ Task not found!");
    return;
  }
  const newTask = readlineSync.question("Enter updated task: ").trim();
  if (newTask === "") {
    console.log("⚠️ Task cannot be empty!");
    return;
  }
  todo.task = newTask;
  console.log(`✏️ Updated task #${id} to: "${newTask}"`);
}

function completeTodo(): void {
  const id = readlineSync.questionInt("Enter task ID to mark as completed: ");
  const todo = todoList.find(item => item.id === id);
  if (!todo) {
    console.log("⚠️ Task not found!");
    return;
  }
  todo.completed = true;
  console.log(`🎉 Marked "${todo.task}" as completed.`);
}

function displayTodos(): void {
  console.log("\n📝 Current To-Do List:");
  if (todoList.length === 0) {
    console.log("No tasks yet.\n");
  } else {
    todoList.forEach(item => {
      console.log(`${item.id}. [${item.completed ? "✔" : " "}] ${item.task}`);
    });
    console.log("");
  }
}

function main(): void {
  while (true) {
    console.log("===== TODO LIST MENU =====");
    console.log("1. Add Task");
    console.log("2. Remove Task");
    console.log("3. Update Task");
    console.log("4. Mark as Completed");
    console.log("5. View All Tasks");
    console.log("6. Exit");
    const choice = readlineSync.questionInt("Choose an option: ");
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
