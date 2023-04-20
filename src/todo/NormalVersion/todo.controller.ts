import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { CreateTodoDto } from "../dto/createTodoDto";
import { UpdateTodoDto } from "../dto/modifyTodoDto";
import { TodoService } from "./todo.service";
import { QueryDto } from "../dto/queryDto";

@UsePipes(new ValidationPipe({ transform: true }))
@Controller({ path: "todo", version: "1" })
export class TodoController {
  constructor(private TodoService: TodoService) {
  }

  @Get()
  getTodos(@Query() query: QueryDto) {
    return this.TodoService.getTodos();
  }


  @Get("/:id")
  getTodoById(@Param("id") id: string) {
    return this.TodoService.getTodoById(id);
  }

  @Delete("/:id")
  async deleteTodo(@Param("id") id: string, @Req() request) {
    const todo = await this.getTodoById(id);
    if (request.userId !== todo[0].userId) {
      throw new UnauthorizedException("Vous n'êtes pas autorisé à effectuer cette action.");
    }
    return this.TodoService.deleteTodo(id);
  }

  @Patch("/:id")
  async modifyTodo(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto, @Req() request) {
    const todo = await this.getTodoById(id);
    if (request.userId !== todo[0].userId) {
      throw new UnauthorizedException("Vous n'êtes pas autorisé à effectuer cette action.");
    }
    return this.TodoService.updateTodo(id, updateTodoDto);
  }

  @Post()
  addTodo(@Body() createTodoDto: CreateTodoDto, @Req() request) {
    return this.TodoService.addTodo({ ...createTodoDto });
  }

}
