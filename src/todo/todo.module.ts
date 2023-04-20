import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TodoController } from "./NormalVersion/todo.controller";
import { TodoService } from "./NormalVersion/todo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./entities/todo.entity";
import * as dotenv from "dotenv";
import { AuthenticationMiddleware } from "./middleware/authentication/authentication.middleware";
import { TodoDBController } from "./DBVersion/todoDB.controller";
import { TodoDBService } from "./DBVersion/todoDB.service";

dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController, TodoDBController],
  providers: [TodoService, TodoDBService],
  exports: [TypeOrmModule]

})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Register the AuthMiddleware to be used globally for all routes
    consumer.apply(AuthenticationMiddleware).forRoutes(
      { path: "todo", method: RequestMethod.POST },
      { path: "todo/:id", method: RequestMethod.DELETE },
      { path: "todo/soft/:id", method: RequestMethod.DELETE },
      { path: "todo/:id", method: RequestMethod.PATCH },
      { path: "todo/restore/:id", method: RequestMethod.PATCH });
  }
}
