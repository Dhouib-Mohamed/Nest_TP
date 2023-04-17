import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // Fermer l'application Nest.js
}

// Appeler la fonction bootstrap pour démarrer le processus de seed
bootstrap();


