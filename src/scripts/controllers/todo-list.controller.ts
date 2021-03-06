import TodoListModel from "../models/todo-list.model";
import { Filters } from "../types";
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
      this._todoListModel.create(text);
      this._todoListView.render(
        this._todoListModel.taskList,
        this.currentFilterValue
      );
    }
    console.log(this._todoListModel.taskList);
  }

  actionChange(id: number, text: string): void {
    this._todoListModel.changeText(id, text);
    console.log(this._todoListModel.taskList);

    this._todoListView.render(
      this._todoListModel.taskList,
      this.currentFilterValue
    );
  }

  actionToggle(id: number): void {
    this._todoListModel.toggle(id);
    console.log(this._todoListModel.taskList);

    this._todoListView.render(
      this._todoListModel.taskList,
      this.currentFilterValue
    );
  }

  actionRemove(id: number): void {
    this._todoListModel.delete(id);
    console.log(this._todoListModel.taskList);

    this._todoListView.render(
      this._todoListModel.taskList,
      this.currentFilterValue
    );
  }

  actionRemoveAllComplete(): void {
    this._todoListModel.removeUnCompleted();
    console.log(this._todoListModel.taskList);
    this._todoListView.render(
      this._todoListModel.taskList,
      this.currentFilterValue
    );
  }

  actionChangeFilter(value: Filters) {
    this.currentFilterValue = value;
    localStorage.setItem("filterState", value);
    // console.log(this.currentFilterValue)
    this._todoListView.render(
      this._todoListModel.taskList,
      this.currentFilterValue
    );
  }
}
