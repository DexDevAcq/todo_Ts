import { ITodoItem } from "../types";

export default class TodoListModel {
  currentInputValue = "";

  taskList: ITodoItem[] =
    JSON.parse(localStorage.getItem("currentTaskList")) || [];

  create(text: string) {
    const todo: ITodoItem = {
      id: Math.floor(Math.random() * 100000),
      text,
      completed: false,
    };
    this.taskList.push(todo);
    this.setLocalStorage();
  }

  changeText(id: number, text: string) {
    this.taskList = this.taskList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      } else {
        return todo;
      }
    });
    this.setLocalStorage();
  }

  toggle(id: number) {
    this.taskList = this.taskList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      } else {
        return todo;
      }
    });
    this.setLocalStorage();
  }

  delete(id: number) {
    this.taskList = this.taskList.filter((todo) => todo.id !== id);
    this.setLocalStorage();
  }

  removeUnCompleted() {
    this.taskList = this.taskList.filter((todo) => !todo.completed);
    this.setLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem("currentTaskList", JSON.stringify(this.taskList));
  }
}
