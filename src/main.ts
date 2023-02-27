import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from "./todo/todo.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
