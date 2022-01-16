import { ITodoItem, Uri } from "../types";

export default class TodoListModel {
  currentInputValue = "";

  taskList: ITodoItem[] =
    JSON.parse(localStorage.getItem("currentTaskList")) || [];

  init() {
    this.request();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async request(
    _method = "GET",
    _link?: string,
    key?: string,
    value?: string | boolean
  ) {
    if (_method !== "GET") {
      const response = await fetch(_link, {
        method: _method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [key]: value }),
      });
      const data = await response.json();
      this.taskList = [...data];
      return localStorage.setItem(
        "currentTaskList",
        JSON.stringify(this.taskList)
      );
    } else {
      const response = await fetch(Uri.LINK);
      const data = await response.json();
      this.taskList = [...data];
      return localStorage.setItem(
        "currentTaskList",
        JSON.stringify(this.taskList)
      );
    }
  }

  create(text: string): void {
    const todo = {
      id: Math.floor(Math.random() * 100000),
      text,
      completed: false,
    };
    this.request("POST", Uri.LINK, "text", text);
    this.taskList.push(todo);
  }

  changeText(id: number, text: string): void {
    this.taskList = this.taskList.map((todo) => {
      if (todo.id === id) {
        this.request("PUT", Uri.LINK + `${id.toString()}`, "text", text);
        return {
          ...todo,
          text,
        };
      } else {
        return todo;
      }
    });
  }

  toggle(id: number): void {
    this.taskList = this.taskList.map((todo) => {
      if (todo.id === id) {
        this.request(
          "PUT",
          Uri.LINK + `${id.toString()}`,
          "completed",
          !todo.completed
        );
        return {
          ...todo,
          completed: !todo.completed,
        };
      } else {
        return todo;
      }
    });
  }

  delete(id: number): void {
    this.taskList = this.taskList.filter((todo) => todo.id !== id);
    this.request("DELETE", Uri.LINK + `${id.toString()}`);
  }

  removeUnCompleted(): void {
    this.taskList = this.taskList.filter((todo) => !todo.completed);
    this.request("DELETE", Uri.LINK + "0");
  }
}
