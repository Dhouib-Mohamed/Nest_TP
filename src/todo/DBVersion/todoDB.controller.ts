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
import { QueryDto } from "../dto/queryDto";
import { TodoDBService } from "./todoDB.service";

@UsePipes(new ValidationPipe({ transform: true }))
@Controller({ path: "todo" })
export class TodoDBController {
  constructor(private TodoService: TodoDBService) {
  }

  @Get()
  getTodos(@Query() query: QueryDto) {
    return this.TodoService.getTodosQuery(query.critere, query.status);
  }

  @Get("/pagination")
  pagination(@Query("page") page: number, @Query("limit") limit: number) {
    return this.TodoService.getTodoPagination(page, limit);
  }

  @Get("/partial")
  getTodosStatutCritere() {
    return this.TodoService.getStatusCritere();
  }

  @Get("/status")
  getTodosByStatus() {
    return this.TodoService.getStatus();
  }

  @Get("/:id")
  getTodoById(@Param("id") id: string) {
    return this.TodoService.getTodoById(id);
  }

  @Delete("/soft/:id")
  async softDeleteTodo(@Param("id") id: string, @Req() request) {
    const todo = await this.getTodoById(id);
    if (request.userId !== todo[0].userId) {
      throw new UnauthorizedException("Vous n'êtes pas autorisé à effectuer cette action.");
    }
    return this.TodoService.softDeleteTodo(id);
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
    return this.TodoService.addTodo({ ...createTodoDto, userId: request.userId });
  }

  @Patch("/restore/:id")
  async restoreTodo(@Param("id") id: string, @Req() request) {
    const todo = await this.getTodoById(id);
    if (request.userId !== todo[0].userId) {
      throw new UnauthorizedException("Vous n'êtes pas autorisé à effectuer cette action.");
    }
    return this.TodoService.restoreTodo(id);
  }
}
