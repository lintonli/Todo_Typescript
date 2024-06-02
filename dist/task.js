"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// interface ITask {
//   id: number;
//   taskname: string;
//   tasktext: string;
//   completed: boolean;
// }
const taskURL = "http://localhost:3000/tasks";
class Task {
    constructor(tasks) {
        this.tasks = tasks;
    }
    getTask() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(taskURL);
            const data = yield response.json();
            return data;
        });
    }
    fetchTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tasks.length === 0) {
                yield this.getTask();
            }
            return this.tasks;
        });
    }
    toggleComplete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.fetchTasks();
            const task = tasks.find((t) => t.id === id);
            if (task) {
                task.completed = !task.completed;
            }
            // console.log(task);
        });
    }
    addTask(taskname, tasktext) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = {
                taskname,
                tasktext,
                completed: false,
            };
            if ((button === null || button === void 0 ? void 0 : button.textContent) === "Add") {
                yield fetch(taskURL, {
                    method: "POST",
                    body: JSON.stringify(newTask),
                });
                console.log(`Task added: ${taskname}`);
            }
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${taskURL}/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                console.log(`Product deleted:`);
                yield this.getTask();
            }
            console.error(`failed to delete`);
        });
    }
}
const tasksarray = new Task([]);
class DisplayTasks {
    constructor(tasksarray, taskElement) {
        this.tasksarray = tasksarray;
        this.taskElement = taskElement;
    }
    displayTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield tasksarray.getTask();
            this.taskElement.innerHTML = "";
            tasks.forEach((task) => {
                const taskdiv = document.createElement("div");
                taskdiv.className = "comm";
                taskdiv.innerHTML = `ID: ${task.id} <h1> Name:${task.taskname}</h1> <p> Description: ${task.tasktext}</p>
            <input type='checkbox' ${task.completed ? "checked" : ""} name='complete' onchange='toggleComplete(${task.id})'/> Completed?
      <button class="delete" data-id="${task.id}">Delete</button> 
      `;
                this.taskElement.appendChild(taskdiv);
            });
            const deleteButtons = content.querySelectorAll(".delete");
            deleteButtons.forEach((buttons) => {
                buttons.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
                    const target = event.target;
                    const taskId = target.getAttribute("data-id");
                    if (taskId) {
                        yield this.tasksarray.deleteTask(taskId);
                        yield this.displayTasks();
                    }
                }));
            });
        });
    }
}
const content = document.getElementById("taskid");
const display = new DisplayTasks(tasksarray, content);
const button = document.getElementById("btn");
const taskList = document.getElementById("form");
if (button) {
    button.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const taskName = document.getElementById("task")
            .value;
        const taskText = document.getElementById("text")
            .value;
        yield tasksarray.addTask(taskName, taskText);
        display.displayTasks();
    }));
}
else {
    console.log("No Tasks in schedule");
}
document.addEventListener("DOMContentLoaded", () => {
    display.displayTasks();
});
