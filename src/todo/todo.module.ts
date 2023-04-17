import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./entities/todo.entity";
import * as dotenv from "dotenv";
import { AuthenticationMiddleware } from "./middleware/authentication/authentication.middleware";

dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TypeOrmModule]

})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Register the AuthMiddleware to be used globally for all routes
    consumer.apply(AuthenticationMiddleware).forRoutes("*");
  }
}
