import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from "../models/todo.model";
import { CreateTodoDto } from "../dto/createTodoDto";
import { UpdateTodoDto } from "../dto/modifyTodoDto";
import { PROVIDER_TOKENS } from "../../common/common.module";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TodoEntity } from "../entities/todo.entity";

@Injectable()
export class TodoService {
  private readonly todos: Todo[];

  constructor(
    @Inject(PROVIDER_TOKENS.uuid) private uuid,
    @InjectRepository(TodoEntity) private readonly TodoRepository: Repository<TodoEntity>
  ) {
    this.todos = [];
  }

  newTodo(name: string, description: string, id = "") {
    const todo = new Todo();
    todo.id = this.uuid();
    todo.userId = id;
    todo.name = name;
    todo.description = description;
    todo.date_creation = new Date();
    return todo;
  }

  getTodos() {
    return this.todos;
  }

  getTodoById(id: string) {
    const todo = this.todos.find((e) => e.id === id);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
    this.todos.splice(index, 1);
    return { "number of deleted elements": 1 };
  }

  addTodo(data: CreateTodoDto) {
    const todo = this.newTodo(data.name, data.description);
    this.todos.push(todo);
    return todo;
  }

  updateTodo(id: string, data: UpdateTodoDto) {
    let todo = this.getTodoById(id);
    this.deleteTodo(id);
    todo = { ...todo, ...data };
    this.todos.push(todo);
    return todo;
  }

}
