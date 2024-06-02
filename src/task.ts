import { ITask, IAddTask } from "./interface";
// interface ITask {
//   id: number;
//   taskname: string;
//   tasktext: string;
//   completed: boolean;
// }
const taskURL = "http://localhost:3000/tasks";
class Task {
  private tasks: ITask[];
  constructor(tasks: ITask[]) {
    this.tasks = tasks;
  }
  async getTask(): Promise<ITask[]> {
    const response = await fetch(taskURL);
    const data = await response.json();
    return data;
  }
  async fetchTasks(): Promise<ITask[]> {
    if (this.tasks.length === 0) {
      await this.getTask();
    }
    return this.tasks;
  }

  async toggleComplete(id: number): Promise<void> {
    const tasks = await this.fetchTasks();
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
    // console.log(task);
  }
  async addTask(taskname: string, tasktext: string): Promise<void> {
    const newTask: IAddTask = {
      taskname,
      tasktext,
      completed: false,
    };
    if (button?.textContent === "Add") {
      await fetch(taskURL, {
        method: "POST",
        body: JSON.stringify(newTask),
      });
      console.log(`Task added: ${taskname}`);
    }
  }
  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${taskURL}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`Product deleted:`);
      await this.getTask();
    }
    console.error(`failed to delete`);
  }
}
const tasksarray = new Task([]);

class DisplayTasks {
  private tasksarray: Task;
  private taskElement: HTMLElement;

  constructor(tasksarray: Task, taskElement: HTMLElement) {
    this.tasksarray = tasksarray;
    this.taskElement = taskElement;
  }

  async displayTasks(): Promise<void> {
    const tasks = await tasksarray.getTask();
    this.taskElement.innerHTML = "";
    tasks.forEach((task) => {
      const taskdiv = document.createElement("div");
      taskdiv.className = "comm";
      taskdiv.innerHTML = `ID: ${task.id} <h1> Name:${
        task.taskname
      }</h1> <p> Description: ${task.tasktext}</p>
            <input type='checkbox' ${
              task.completed ? "checked" : ""
            } name='complete' onchange='toggleComplete(${task.id})'/> Completed?
      <button class="delete" data-id="${task.id}">Delete</button> 
      `;
      this.taskElement.appendChild(taskdiv);
    });
    const deleteButtons = content.querySelectorAll(".delete");
    deleteButtons.forEach((buttons) => {
      buttons.addEventListener("click", async (event) => {
        const target = event.target as HTMLElement;
        const taskId = target.getAttribute("data-id");
        if (taskId) {
          await this.tasksarray.deleteTask(taskId);
          await this.displayTasks();
        }
      });
    });
  }
}

const content = document.getElementById("taskid") as HTMLDivElement;
const display = new DisplayTasks(tasksarray, content);
const button = document.getElementById("btn");
const taskList = document.getElementById("form");
if (button) {
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const taskName = (document.getElementById("task") as HTMLInputElement)
      .value;
    const taskText = (document.getElementById("text") as HTMLInputElement)
      .value;

    await tasksarray.addTask(taskName, taskText);
    display.displayTasks();
  });
} else {
  console.log("No Tasks in schedule");
}

document.addEventListener("DOMContentLoaded", () => {
  display.displayTasks();
});
