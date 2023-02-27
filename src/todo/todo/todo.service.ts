import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from "../models/todo.model";
import { CreateTodoDto } from "../dto/createTodoDto";
import { UpdateTodoDto } from "../dto/modifyTodoDto";
import { PROVIDER_TOKENS } from "../../common/common.module";

@Injectable()
export class TodoService {
  constructor(@Inject(PROVIDER_TOKENS.uuid)private uuid) {
  }

  newTodo (name:string,description:string) {
    const todo = new Todo()
    todo.id = this.uuid();
    todo.name = name;
    todo.description = description;
    todo.date_creation = new Date();
    return todo;
  }
  getTodoById(todos:Todo[],id:string) {
    const todo = todos.find((e)=>e.id===id)
    if(!todo) {
      throw new NotFoundException()
    }
    return todo
  }
  deleteTodo(todos:Todo[],id:string) {
    const index = todos.findIndex((e)=>e.id===id);
    if (index===-1) {
      throw new NotFoundException()
    }
    todos.splice(index,1);
    return {'number of deleted elements': 1 };
  }
  addTodo(todos:Todo[],data:CreateTodoDto) {
    const todo = this.newTodo(data.name,data.description)
    todos.push(todo)
    return todo
  }
  updateTodo(todos:Todo[],id:string,data:UpdateTodoDto) {
    let todo = this.getTodoById(todos,id)
    this.deleteTodo(todos,id)
    todo = {...todo,...data}
    todos.push(todo)
    return todo
  }
}
