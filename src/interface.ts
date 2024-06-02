export interface ITask {
  id: number;
  taskname: string;
  tasktext: string;
  completed: boolean;
}

export interface IAddTask {
  id?: string;
  taskname: string;
  tasktext: string;
  completed: boolean;
}
