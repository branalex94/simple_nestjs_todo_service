import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { DateUtils } from 'src/utils/dates';
import { UsersService } from 'src/users/users.service';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService {
  private _todos: Todo[] = [];
  private idInt: number = 1;
  private userService: UsersService;

  constructor(userService: UsersService) {
    this.userService = userService;
  }

  create(createTodoDto: CreateTodoDto): TodoDto {
    const user = this.userService.findUserEntity(createTodoDto.userId);
    const creationDate = DateUtils.getCurrentDate();
    const newTodo = new Todo(
      this.idInt++,
      createTodoDto.name,
      createTodoDto.description,
      creationDate,
      creationDate,
      user,
    );
    const todoDto = this.todoEntityToDto(newTodo);
    this._todos.push(newTodo);
    user.addTodo(newTodo);
    return todoDto;
  }

  findAll(): TodoDto[] {
    return this._todos.map((todo) => this.todoEntityToDto(todo));
  }

  findOne(id: number): TodoDto {
    if (isNaN(id)) throw new BadRequestException('Invalid to-do id');
    const todo = this._todos.find((todo) => todo.id == id);
    if (todo == undefined) {
      throw new NotFoundException();
    }
    const todoDto = this.todoEntityToDto(todo);
    return todoDto;
  }

  findTodosByUserId(id: number): TodoDto[] {
    const user = this.userService.findOne(id);
    const todos = this._todos
      .filter((todo) => todo.user.id == user.id)
      .map((todo) => this.todoEntityToDto(todo));
    return todos;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): TodoDto {
    if (isNaN(id)) throw new BadRequestException('Invalid to-do id');
    const findTodo = this._todos.find((todo) => todo.id == id);
    if (findTodo == undefined) {
      throw new NotFoundException();
    }

    if (updateTodoDto.name != undefined) {
      findTodo.name = updateTodoDto.name;
    }
    if (updateTodoDto.description != undefined) {
      findTodo.description = updateTodoDto.description;
    }
    if (updateTodoDto.isCompleted != undefined) {
      findTodo.isCompleted = updateTodoDto.isCompleted;
    }
    const updatedDate = DateUtils.getCurrentDate();
    findTodo.updatedAt = updatedDate;
    const index = this._todos.indexOf(findTodo);
    this._todos[index] = findTodo;
    return this.todoEntityToDto(findTodo);
  }

  remove(id: number) {
    if (isNaN(id)) throw new BadRequestException('Invalid to-do id');
    const findTodo = this.findOne(id);
    this._todos = this._todos.filter((todo) => todo.id != findTodo.id);
    return findTodo.id;
  }

  todoEntityToDto(todo: Todo): TodoDto {
    return new TodoDto(
      todo.id,
      todo.name,
      todo.description,
      todo.isCompleted,
      todo.createdAt,
      todo.updatedAt,
      todo.user.id,
    );
  }
}
