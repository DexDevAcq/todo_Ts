import { ITodoItem, Uri } from "../types";

export default class TodoListModel {
  currentInputValue = "";

  taskList: ITodoItem[] =
    JSON.parse(localStorage.getItem("currentTaskList")) || [];

  init() {
    this.request();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async request(
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
}
