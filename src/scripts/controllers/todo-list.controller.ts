import TodoListModel from "../models/todo-list.model";
import { Filters, Uri } from "../types";
import TodoListView from "../views/todo-list.view";

export default class TodoListController {
  private currentFilterValue: Filters =
    <Filters>localStorage.getItem("filterState") || Filters.ALL;

  constructor(
    private readonly _todoListModel: TodoListModel,
    private readonly _todoListView: TodoListView
  ) {
    _todoListView.init({
      onInput: this.actionInput.bind(this),
      onSubmit: this.actionAdd.bind(this),
      onChange: this.actionChange.bind(this),
      onToggle: this.actionToggle.bind(this),
      onRemove: this.actionRemove.bind(this),
      onDeleteAllCompleted: this.actionRemoveAllComplete.bind(this),
      onClickFilter: this.actionChangeFilter.bind(this),
    });
  }

  init(): void {
    this._todoListModel.init();
    this._todoListView.render(
      this._todoListModel.taskList,
      this.currentFilterValue
    );
  }

  actionInput(value: string): void {
    this._todoListModel.currentInputValue = value;
  }

  actionAdd(): void {
    const text = this._todoListModel.currentInputValue.trim();

    if (text) {
      this._todoListModel
        .request("POST", Uri.LINK, "text", text)
        .then(() =>
          this._todoListView.render(
            this._todoListModel.taskList,
            this.currentFilterValue
          )
        );
    }
  }

  actionChange(id: number, text: string): void {
    this._todoListModel
      .request("PUT", Uri.LINK + `${id.toString()}`, "text", text)
      .then(() =>
        this._todoListView.render(
          this._todoListModel.taskList,
          this.currentFilterValue
        )
      );
  }

  actionToggle(id: number): void {
    const todo = this._todoListModel.taskList.find((todo) => todo.id === id);
    this._todoListModel
      .request(
        "PUT",
        Uri.LINK + `${id.toString()}`,
        "completed",
        !todo.completed
      )
      .then(() =>
        this._todoListView.render(
          this._todoListModel.taskList,
          this.currentFilterValue
        )
      );
  }

  actionRemove(id: number): void {
    this._todoListModel
      .request("DELETE", Uri.LINK + `${id.toString()}`)
      .then(() =>
        this._todoListView.render(
          this._todoListModel.taskList,
          this.currentFilterValue
        )
      );
  }

  actionRemoveAllComplete(): void {
    this._todoListModel
      .request("DELETE", Uri.LINK + "0")
      .then(() =>
        this._todoListView.render(
          this._todoListModel.taskList,
          this.currentFilterValue
        )
      );
  }

  actionChangeFilter(value: Filters) {
    this.currentFilterValue = value;
    localStorage.setItem("filterState", value);
    this._todoListView.render(
      this._todoListModel.taskList,
      this.currentFilterValue
    );
  }
}
