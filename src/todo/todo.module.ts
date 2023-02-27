import { Module } from '@nestjs/common';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { CommonModule } from "../common/common.module";

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
