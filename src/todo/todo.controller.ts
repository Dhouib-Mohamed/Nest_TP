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
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { CreateTodoDto } from "./dto/createTodoDto";
import { UpdateTodoDto } from "./dto/modifyTodoDto";
import { TodoService } from "./todo.service";
import { QueryDto } from "./dto/queryDto";
import { AuthenticationMiddleware } from "./middleware/authentication/authentication.middleware";

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(AuthenticationMiddleware)
@Controller("todo")
export class TodoController {
  constructor(private TodoService: TodoService) {
  }

  @Get()
  getTodos(@Query() query: QueryDto) {
    return this.TodoService.getTodosDBQuery(query.critere, query.status);
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
    return this.TodoService.getStatusDB();
  }

  @Get("/:id")
  getTodoById(@Param("id") id: string) {
    return this.TodoService.getTodoByIdDB(id);
  }

  @Delete("/soft/:id")
  async softDeleteTodo(@Param("id") id: string, @Req() request) {
    const todo = await this.getTodoById(id);
    if (request.userId !== todo[0].userId) {
      throw new UnauthorizedException("Vous n'êtes pas autorisé à effectuer cette action.");
    }
    return this.TodoService.softDeleteTodoDB(id);
  }

  @Delete("/:id")
  async deleteTodo(@Param("id") id: string, @Req() request) {
    const todo = await this.getTodoById(id);
    if (request.userId !== todo[0].userId) {
      throw new UnauthorizedException("Vous n'êtes pas autorisé à effectuer cette action.");
    }
    return this.TodoService.deleteTodoDB(id);
  }

  @Patch("/:id")
  async modifyTodo(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto, @Req() request) {
    const todo = await this.getTodoById(id);
    if (request.userId !== todo[0].userId) {
      throw new UnauthorizedException("Vous n'êtes pas autorisé à effectuer cette action.");
    }
    return this.TodoService.updateTodoDB(id, updateTodoDto);
  }

  @Post()
  addTodo(@Body() createTodoDto: CreateTodoDto, @Req() request) {
    return this.TodoService.addTodoDB({ ...createTodoDto, userId: request.userId });
  }

  @Patch("/restore/:id")
  async restoreTodo(@Param("id") id: string, @Req() request) {
    const todo = await this.getTodoById(id);
    if (request.userId !== todo[0].userId) {
      throw new UnauthorizedException("Vous n'êtes pas autorisé à effectuer cette action.");
    }
    return this.TodoService.restoreTodoDB(id);
  }
}
