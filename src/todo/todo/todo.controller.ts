import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { Todo } from "../models/todo.model";
import { CreateTodoDto } from "../dto/createTodoDto";
import { UpdateTodoDto } from "../dto/modifyTodoDto";
import { TodoService } from "./todo.service";
@Controller('todo')
export class TodoController {

  constructor(private TodoService:TodoService) {
    this.todos = [];
  }

  private readonly todos : Todo[] ;
  @Get()
  getTodos() {
    return this.todos
  }
  @Get('/:id')
  getTodoById(@Param('id') id:string) {
    return this.TodoService.getTodoById(this.todos,id)
  }
  @Delete('/:id')
  deleteTodo(@Param('id') id:string) {
    return this.TodoService.deleteTodo(this.todos,id)
  }
  @Patch('/:id')
  modifyTodo(@Param('id') id:string,@Body() updateTodoDto:UpdateTodoDto ) {
    return this.TodoService.updateTodo(this.todos,id,updateTodoDto)
  }
  @Post()
  addTodo(@Body() createTodoDto:CreateTodoDto) {
    return this.TodoService.addTodo(this.todos,createTodoDto)
  }
}
