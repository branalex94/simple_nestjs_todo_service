import { User } from 'src/users/entities/user.entity';

export class Todo {
  private _id: number;
  private _name: string;
  private _description: string;
  private _isCompleted: boolean = false;
  private _createdAt: Date | string;
  private _updatedAt: Date | string;
  private _user: User;

  // private _user: any;

  constructor(
    id: number,
    name: string,
    description: string,
    createdAt: Date | string,
    updatedAt: Date | string,
    user: User,
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._user = user;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get isCompleted() {
    return this._isCompleted;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get user() {
    return this._user;
  }

  set name(newVal: string) {
    this._name = newVal;
  }

  set description(newVal: string) {
    this._description = newVal;
  }

  set isCompleted(newVal: boolean) {
    this._isCompleted = newVal;
  }

  set updatedAt(newVal: Date | string) {
    this._updatedAt = newVal;
  }
}
