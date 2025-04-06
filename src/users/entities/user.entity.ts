import { Todo } from 'src/todos/entities/todo.entity';

export class User {
  private _id: number;
  private _username: string;
  private _email: string;
  private _password: string;
  private _todos: Todo[] = [];
  private _createdAt: Date | string;
  private _updatedAt: Date | string;

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    createdAt: Date | string,
    updatedAt: Date | string,
  ) {
    this._id = id;
    this._username = username;
    this._email = email;
    this._password = password;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id() {
    return this._id;
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get todos() {
    return this._todos;
  }

  set updatedAt(val: Date | string) {
    this._updatedAt = val;
  }

  set username(val: string) {
    this._username = val;
  }

  set email(val: string) {
    this._email = val;
  }

  set password(val: string) {
    this._password = val;
  }

  addTodo(todo: Todo) {
    this._todos.push(todo);
  }
}
